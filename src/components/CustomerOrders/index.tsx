import React, {useEffect, useRef, useState} from 'react';
import {List, Avatar, Button, Skeleton, message} from 'antd';
import {getUserId} from "../../utils/user";
import {getOrderStatus, order_status} from "../../utils/utils";
import {getPaymentMethodByUserId, queryOrderByUser} from "../../net";
import {OrderDetail} from "../../utils/javamodel";
import OrderDetailModal from '../OrderDetailModal';
import {PaymentMethod} from '../../net/reqBody';
import {Resp} from '../../net/resp';
import OrderCommentModal from "../OrderCommentModal";
import VirtualList from 'rc-virtual-list';



function CustomerOrders() {

    const [list, setList] = useState<Array<OrderDetail>>([])
    const [position, setPosition] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [showClick, setShowClick] = useState<number>(0)
    const [selectedOrder, setSelectedOrder] = useState<OrderDetail>({})
    const [doType, setDoType] = useState<number>(0)
    const [paymethods, setPaymethods] = React.useState<Array<PaymentMethod>>([]);
    const [feedBackModalClickNumber, setFeedBackModalClickNumber] = useState<number>(0)
    const [feedBackOrder, setFeedBackOrder] = useState<OrderDetail>({})


    useEffect(() => {
        loadData().catch()
        queryPaymentMethods().catch()
    }, [])


    const resetOrder = (order: OrderDetail) => {
        resetData().catch()
    }

    const queryPaymentMethods = async () => {
        const userId = getUserId();
        if (userId !== null) {
            const raw_resp = await getPaymentMethodByUserId(userId!);
            const resp: Resp = raw_resp.data
            if (resp.code === 0) {
                setPaymethods(resp.data as Array<PaymentMethod>)
            }
        }
    };


    const resetData = async () => {
        setHasMore(true)
        setLoading(true)
        const userId = getUserId()
        setPosition(0)
        const resp = await queryOrderByUser(userId!, 0)
        const res: Resp = resp.data
        if (res.code === 0) {
            const data : Array<OrderDetail> = res.data as Array<OrderDetail>
            setList([...data])
            setPosition(data.length)
            if (data.length < 5) {
                setHasMore(false)
            }
        }
        setLoading(false)
    };

    const loadData = async () => {
        if (!hasMore || loading) {
            return;
        }
        setLoading(true)
        const userId = getUserId()
        const resp = await queryOrderByUser(userId!, position)
        const res: Resp = resp.data
        if (res.code === 0) {
            const data : Array<OrderDetail> = res.data as Array<OrderDetail>
            const newlist = [...list, ...data]
            setList(newlist)
            setPosition(newlist.length)
            if (data.length < 5) {
                setHasMore(false)
            }
        }
        setLoading(false)
    }

    const payOrder = (order?: OrderDetail) => {
        setShowClick(showClick + 1)
        setSelectedOrder(order!)
        setDoType(1)
    }

    const cancelOrder = (order?: OrderDetail) => {
        setShowClick(showClick + 1)
        setSelectedOrder(order!)
        setDoType(2)
    }

    const viewDetail = (order?: OrderDetail) => {
        setShowClick(showClick + 1)
        setSelectedOrder(order!)
        setDoType(3)
    };

    const comment = (order?: OrderDetail) => {
        setFeedBackModalClickNumber(feedBackModalClickNumber + 1)
        setFeedBackOrder(order!)
    };


    const actionList = (item: OrderDetail): React.ReactNode[] => {
        switch (item.status) {
            case order_status.CREATE:
                return [<Button onClick={() => {
                    payOrder(item)
                }}>Pay order</Button>,
                    <Button onClick={() => {
                        cancelOrder(item)
                    }}>Cancel order</Button>,
                    <Button onClick={() => {
                        viewDetail(item)
                    }}>View Detail</Button>];
            case order_status.FINISHED:
                return [<Button onClick={() => {
                    viewDetail(item)
                }}>View Detail</Button>,
                    <Button onClick={() => {
                        comment(item)
                    }}>Comment</Button>]
            default:
                return [<Button onClick={() => {
                    viewDetail(item)
                }}>View Detail</Button>]
        }
    };


    return (
        <div>
            <List>
                <VirtualList
                    data={list}
                    height={600}
                    itemHeight={40}
                    itemKey="orderId"
                    onScroll={loadData}
                >
                    {(item: OrderDetail) => (
                        <List.Item key={item.orderId} actions={actionList(item)}>
                            <Skeleton avatar title={false} active={true} loading={loading}>
                                <List.Item.Meta
                                    title={<b>{item.orderId} {"ORDER " + getOrderStatus(item.status!)}</b>}
                                    description={<div key={"div1:" + item.orderId}>
                                        <div key={"div11:" + item.orderId}>Delivered to {item.location}</div>
                                        <div key={"div12:" + item.orderId}>Order
                                            time {(String(item.orderTime)).replace("T", " ")}</div>
                                    </div>}
                                />
                                <div key={"div" + item.orderId}>{item.goodsList ? item.goodsList.map((ele) => {
                                    return <div
                                        key={"elediv" + ele.goodsId}>{ele.name} Price: {ele.price} Quantity: {ele.count}</div>
                                }) : null}</div>
                            </Skeleton>
                        </List.Item>
                    )}
                </VirtualList>
            </List>
            <OrderDetailModal click={showClick} order={selectedOrder} type={doType} paymethods={paymethods}
                              resetOrder={resetOrder}/>
            <OrderCommentModal order={feedBackOrder} click={feedBackModalClickNumber}/>
        </div>
    );
}

export default CustomerOrders;

