import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {getUserId} from "../../utils/user";

import {Select, message, Button, Collapse, Input, Space, Table, Empty, InputRef} from 'antd';
import {parseCardNumber, parseCvvCode} from "../../utils/utils";
import {addPaymentMethod, delPaymentMethodByPid, getPaymentMethodByUserId} from "../../net";
import {Resp} from "../../net/resp";
import {PaymentMethod, Details} from "../../net/reqBody";

const {Option} = Select;

const {Panel} = Collapse;


function PaymentMethodPanel() {


    const [type, setType] = useState<number | undefined>();
    const [cardNumber, setCardNumber] = useState<number | undefined>();
    const [cvvCode, setCvvCode] = useState<number | undefined>();
    const [data, setData] = useState<Array<PaymentMethod>>([]);


    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: () => <a>CREDIT</a>,
        },
        {
            title: 'CARD NUMBER',
            dataIndex: 'details',
            key: 'card number',
            render: (details: string) => (<a>{parseCardNumber(details)}</a>)
        },
        {
            title: 'CVV CODE',
            dataIndex: 'details',
            key: 'cvv code',
            render: (details: string) => <a>{parseCvvCode(details)}</a>
        },
        {
            title: 'Action',
            key: 'action',
            render: (item: PaymentMethod) => (
                <Space size="middle">
                    <a>dett={item.details}</a>
                    <Button onClick={() => {del(item.id!)}}>DELETE</Button>
                </Space>
            ),
        },
    ];

    const queryPaymentMethods = async () => {
        const userId = getUserId();
        if (userId !== null) {
            const raw_resp = await getPaymentMethodByUserId(userId);
            const resp: Resp = raw_resp.data
            if (resp.code === 0){
                console.log("resp====",resp)
                setData(resp.data as Array<PaymentMethod>)
            }
        }
    };

    useEffect( () => {
        queryPaymentMethods().catch(console.error);
    }, [])




    const onAdd = async () => {
        const userId = getUserId();
        if (userId == null){
            message.warn("please login")
            return
        }
        if (type === undefined){
            message.warn("please select type")
            return
        }
        if (cardNumber === undefined){
            message.warn("please input card number")
            return
        }
        if (cvvCode === undefined){
            message.warn("please input cvv code")
            return
        }
        const details: Details = {
            cardNumber: cardNumber,
            cvvCode: cvvCode
        }
        const paymentMethod: PaymentMethod = {
            userId: userId,
            paymentType: type,
            details: JSON.stringify(details)
        }
        const raw_resp = await addPaymentMethod(paymentMethod)
        const resp: Resp = raw_resp.data
        message.info(resp.msg)
        if (resp.code === 0) {
            setCardNumber(undefined)
            setCvvCode(undefined)
            setType(undefined)
            queryPaymentMethods().catch();
        }
    };

    const onCardNumberChange = (e : ChangeEvent<HTMLInputElement>): void => {
        setCardNumber(parseInt(e.target.value))
    };

    const onCvvCodeChange = (e : ChangeEvent<HTMLInputElement>): void => {
        setCvvCode(parseInt(e.target.value))
    };

    const onTypeChange = (val: number): void => {
        setType(val)
    };


    const del = async (id: number) => {
        const raw_resp = await delPaymentMethodByPid(id)
        const resp: Resp = raw_resp.data
        if (resp.code === 0) {
            const newdata = data.filter((item: PaymentMethod) => {
                return item.id !== id;
            })
            setData(newdata)
        }
        message.info(resp.msg)
    };



    return (
        <div>
            <h2>USER PAYMENT METHOD</h2>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="ADD NEW PAYMENT METHOD" key="1">
                    <Select style={{width: '100%'}} placeholder={"please select"} onSelect={onTypeChange} value={type}>
                        <Option value={0}>
                            CREDIT CARD
                        </Option>
                    </Select>
                    <Input type={"number"} placeholder={"input credit card number"} onChange={onCardNumberChange} value={cardNumber}/>
                    <Input type={"number"} placeholder={"input cvv code"} onChange={onCvvCodeChange} value={cvvCode}/>
                    <Button onClick={onAdd}>ADD</Button>
                </Panel>
            </Collapse>
            {
                data.length > 0 ?
                    <Table columns={columns} dataSource={data} rowKey={"id"}/> : <Empty/>
            }

        </div>
    );
}

export default PaymentMethodPanel;