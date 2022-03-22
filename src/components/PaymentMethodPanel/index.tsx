import React, {ChangeEvent, ChangeEventHandler, MutableRefObject, Ref, useEffect, useRef, useState} from 'react';
import {getUserId} from "../../utils/user";

import {Select, message, Button, Collapse, Input, Space, Table, Empty} from 'antd';
import {parseCardNumber, parseCvvCode} from "../../utils/utils";
import {addPaymentMethod, delPaymentMethodByPid, getPaymentMethodByUserId} from "../../net";
import {Resp} from "../../net/resp";
import {PaymentMethod, Details} from "../../net/reqBody";

const {Option} = Select;

const {Panel} = Collapse;


function PaymentMethodPanel() {


    const [type, setType] = useState<number>();
    const [cardNumber, setCardNumber] = useState<number>();
    const [cvvCode, setCvvCode] = useState<number>();
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
            dataIndex: 'card number',
            key: 'card number',
            render: (details: string) => <a>{parseCardNumber(details)}</a>
        },
        {
            title: 'CVV CODE',
            dataIndex: 'cvv code',
            key: 'cvv code',
            render: (details: string) => <a>{parseCvvCode(details)}</a>
        },
        {
            title: 'Action',
            key: 'action',
            render: (id: number) => (
                <Space size="middle">
                    <Button onClick={() => {
                        del(id)
                    }}>DELETE</Button>
                </Space>
            ),
        },
    ];

    const queryPaymentMethods = async () => {
        // const userId = getUserId();
        const userId = 5;
        if (userId !== null) {
            const raw_resp = await getPaymentMethodByUserId(userId);
            const resp: Resp = raw_resp.data
            if (resp.code === 0){
                setData(resp.data as Array<PaymentMethod>)
            }
        }
    };

    useEffect( () => {
        queryPaymentMethods().catch(console.error);
    }, [])


    useEffect(() => {

    }, [])


    const onAdd = async () => {
        if (cardNumber === undefined){
            message.warn("please input card number")
        }
        if (cvvCode === undefined){
            message.warn("please input cvv code")
        }
        const details: Details = {
            cardNumber: cardNumber!,
            cvvCode: cvvCode!
        }
        const paymentMethod: PaymentMethod = {
            userId: getUserId()!,
            paymentType: type!,
            details: JSON.stringify(details)
        }
        const raw_resp = await addPaymentMethod(paymentMethod)
        const resp: Resp = raw_resp.data
        message.info(resp.msg)
        if (resp.code === 0){
            queryPaymentMethods().catch();
        }
    };

    const onCardNumberChange = (e : ChangeEvent<HTMLInputElement>): void => {
        const num = Number(e.target.value)
        if (isNaN(num)){
            message.warn("card number can only contains digit")
        }else{
            setCardNumber(num)
        }
    };

    const onCvvCodeChange = (e : ChangeEvent<HTMLInputElement>): void => {
        const code = Number(e.target.value)
        if (isNaN(code)){
            message.warn("cvv code can only contains digit")
        }else{
            setCvvCode(code)
        }
    };

    const onTypeChange = (e : ChangeEvent<HTMLSelectElement>): void => {
        setType(Number(e.target.value))
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
                    <Select style={{width: '100%'}} placeholder={"please select"} onSelect={onTypeChange}>
                        <Option value={0}>
                            CREDIT CARD
                        </Option>
                    </Select>
                    <Input placeholder={"input credit card number"} onChange={onCardNumberChange}/>
                    <Input placeholder={"input cvv code"} onChange={onCvvCodeChange} />
                    <Button onClick={onAdd}>ADD</Button>
                </Panel>
            </Collapse>
            {
                data.length > 0 ?
                    <Table columns={columns} dataSource={data} /> : <Empty/>
            }

        </div>
    );
}

export default PaymentMethodPanel;