import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Modal,
    Button,
    Descriptions,
    List,
    Row,
    Col,
    Image,
    Radio,
    Space,
    RadioChangeEvent,
    message,
    Steps,
    Empty
} from 'antd';
import {OrderDetail, SaledGoods, SaledGoodsDetail} from "../../utils/javamodel";
import {getFullPicUrl, getOrderStatus, getPaytype, order_status, parseCardNumber} from '../../utils/utils';
import {Link} from "react-router-dom";
import {cancelOrder, getPaymentMethodByUserId, payOrder} from '../../net';
import {Resp} from '../../net/resp';
import {PaymentMethod} from '../../net/reqBody';
import Select from 'rc-select';
import moment from "moment";
import VirtualList from 'rc-virtual-list';

const {Option} = Select;
const {Step} = Steps;


interface OrderProps {
    order?: OrderDetail,
    click: number
    type?: number
    paymethods: Array<PaymentMethod>
    resetOrder?: (order: OrderDetail) => void
}

export default function OrderDetailModal(props: OrderProps) {

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');

    useEffect(() => {
        if (props.click != 0) {
            setVisible(true)
        }
        switch (props.type) {
            case 1:
                setModalText("Confirm Payment");
                break;
            case 2:
                setModalText("Confirm Cancel");
                break;
            default:
                setModalText("Ok");
                break;
        }
    }, [props.click])


    const handleOk = () => {
        if (props.type == 3) {
            setVisible(false);
            return;
        }
        setModalText('Processing');
        setConfirmLoading(true);
        setTimeout(() => {
            switch (props.type) {
                case 1:
                    doPayOrder().catch();
                    break;
                case 2:
                    doCancelOrder().catch();
                    break;
            }
            setConfirmLoading(false);
        }, 2000);
    };

    const doPayOrder = async () => {
        if (order.paymentMethodId == undefined || order.paymentMethodId < 1) {
            message.info("Choose a payment method!")
        } else {
            const raw_resp = await payOrder(order);
            const resp: Resp = raw_resp.data
            if (resp.code === 0) {
                message.info(resp.msg)
                order.status = order_status.PAID
                setVisible(false)
                if (props.resetOrder != null) {
                    props.resetOrder(order);
                }
            }
        }
    };

    const doCancelOrder = async () => {
        const raw_resp = await cancelOrder(order!);
        const resp: Resp = raw_resp.data
        if (resp.code === 0) {
            message.info(resp.msg)
            order.status = order_status.CANCEL
            setVisible(false);
            if (props.resetOrder != null) {
                props.resetOrder(order);
            }
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const order: OrderDetail = props.order!
    order.total = 0
    order.goodsList?.map((goods: SaledGoods) => {
        order.total! += goods.price! * goods.count!
    })

    const handleChange = (value: RadioChangeEvent) => {
        order.paymentMethodId = value.target.value
    }

    const options: Array<JSX.Element> = props.paymethods.map(d => <Radio key={d.id}
                                                                         value={d.id}>{getPaytype(d.paymentType) + ":" + parseCardNumber(d.details)}</Radio>);
    return (
        <Modal
            title="Order Information"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={1000}
            okText={modalText}
        >

            <Descriptions bordered column={3}>
                <Descriptions.Item label="ORDER PLACED"
                                   span={2}>{(String(order.orderTime)).replace("T", " ")}</Descriptions.Item>
                <Descriptions.Item label="ORDER #" span={1}>{order.orderId}</Descriptions.Item>
                <Descriptions.Item label="SHIP TO" span={2}>{order.location}</Descriptions.Item>
                <Descriptions.Item label="Order Status" span={1}><h3>{getOrderStatus(order.status!)}</h3>
                </Descriptions.Item>
            </Descriptions>

            <OrderTimeLine order={props.order}/>
            <List>
                <VirtualList
                    data={order.goodsList!}
                    height={400}
                    itemHeight={100}
                    itemKey={(item) => {
                        return "".concat(String(item.orderId!)).concat(":").concat(String(item.goodsId!))
                    }}
                >
                    {(item: SaledGoodsDetail) => (
                        <List.Item key={item.orderId + ":" + item.goodsId} actions={[]}>
                            <table>
                                <tbody>
                                <tr>
                                    <td style={{verticalAlign: "te"}}>
                                        {
                                            item.pic != null ?
                                                <Image height={100} width={100} alt="logo"
                                                                   src={getFullPicUrl(item.pic!.split(',')[0])}/>
                                                : <Empty description={"no image"}/>
                                        }
                                    </td>
                                    <Space size={200}>
                                        <td >
                                            <Descriptions.Item label={"Name"} contentStyle={{textAlign: 'center'}}><h3>{item.name}</h3></Descriptions.Item>
                                        </td>
                                        <td>
                                            <Descriptions.Item label="Count"><h3>Count: {item.count}</h3></Descriptions.Item>
                                        </td>
                                        <td>
                                            <Descriptions.Item label="Price"><h3>Price: {item.price}</h3></Descriptions.Item>
                                        </td>
                                    </Space>
                                </tr>
                                </tbody>
                            </table>
                        </List.Item>
                    )}
                </VirtualList>
            </List>
            <Descriptions.Item label="TOTAL" span={1}><h3 style={{float: 'right'}}>{"Total: $" + order.total}</h3></Descriptions.Item>
            <Descriptions column={3}>
                {
                    props.type == 1 ?
                        <div>
                            <Space direction={'vertical'}>
                                {props.paymethods.length > 0 && <h3>Choose a payment method: </h3>}
                                <Descriptions.Item label="PAYMENT METHOD" span={2}>
                                    <Radio.Group onChange={(handleChange)} defaultValue={order.paymentMethodId}
                                                 key={"radio" + order.orderId}>
                                        <Space direction="vertical">
                                            {options}
                                        </Space>
                                    </Radio.Group>
                                </Descriptions.Item>
                                <Link to={{pathname: "/customer/payment"}}>Add payment method</Link>
                            </Space>
                        </div>
                        : null
                }
            </Descriptions>

        </Modal>
    );
}


interface OrderTimeLineProp {
    order?: OrderDetail
}

function OrderTimeLine(props: OrderTimeLineProp) {

    const order = props.order!;
    const status: number = order.status!
    if (status == 1) {
        return (
            <div style={{minHeight: '100px', paddingTop: '20px'}}>
                <Steps size="small" current={1}>
                    <Step title="Created" description={"create time: " + moment(order.orderTime).format('MM/DD/YYYY')}/>
                    <Step title="Cancelled"/>
                </Steps>
            </div>
        )
    }
    let offset = 0;
    if (status > 0) {
        offset = status - 1;
    }
    return (
        <div style={{minHeight: '100px', paddingTop: '20px'}}>
            <Steps size="small" current={offset}>
                <Step title="Created" description={"create time: " + moment(order.orderTime).format('MM/DD/YYYY')}/>
                <Step title="Paid"
                      description={order.payTime != null ? "paid time: " + moment(order.payTime).format('MM/DD/YYYY') : "will be delivered in 10s once paid"}/>
                <Step title="In delivery" description={"usually takes around 30s"}/>
                <Step title="Finished"
                      description={order.finishTime != null ? "finish time: " + moment(order.finishTime).format('MM/DD/YYYY') : "wait for delivery"}/>
            </Steps>
        </div>
    )
}




