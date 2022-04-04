import React, {useEffect, useRef, useState} from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import {getUserId} from "../../utils/user";
import {getOrderStatus, order_status} from "../../utils/utils";
import {getPaymentMethodByUserId, queryOrderByUser} from "../../net";
import {OrderDetail} from "../../utils/javamodel";
import { useNavigate } from 'react-router';
import OrderDetailModal from '../OrderDetailModal';
import { PaymentMethod } from '../../net/reqBody';
import { Resp } from '../../net/resp';
/**
 * @author Zetian Huang
 */

const pageCount = 5
function CustomerOrders(){

    const [list, setList] = useState<Array<OrderDetail>>([])
    const [position, setPosition] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [showClick, setShowClick] = useState<number>(0)
    const [selectedOrder, setSelectedOrder] = useState<OrderDetail>({})
    const [doType, setDoType] = useState<number>(0)
    const [paymethods, setPaymethods] = React.useState<Array<PaymentMethod>>([]);


    useEffect(() => {
        loadData()
        queryPaymentMethods()
        return () => {
        };
    }, [])

    const resetOrder = (order:OrderDetail) =>{
      loadData()
    }

    const queryPaymentMethods = async () => {
      const userId = getUserId();
      if (userId !== null) {
          const raw_resp = await getPaymentMethodByUserId(userId!);
          const resp: Resp = raw_resp.data
          if (resp.code === 0){
              setPaymethods(resp.data as Array<PaymentMethod>)
          }
      }
  };

    const loadData = async () => {
        setLoading(true)
        const userId = getUserId()
        //need test
        if(userId==null) return
        const resp = await queryOrderByUser(userId,position)
        const res = resp.data
        if (res.code === 0){
            var newdata:Array<OrderDetail> = []
            newdata = newdata.concat(list,res.data)
            setList(newdata)
            setPosition(newdata.length)
            setLoading(false)
            if(position !==0) window.dispatchEvent(new Event('resize'));
        }else{
            setLoading(false)
        }
    }

    const loadMore =
      position!==0 && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={loadData}>loading more</Button>
        </div>
      ) : null;
    const payOrder = (order?:OrderDetail) =>{
      setShowClick(showClick+1)
      setSelectedOrder(order!)
      setDoType(2)
    }

    const cancelOrder = (order?:OrderDetail) =>{
      setShowClick(showClick+1)
      setSelectedOrder(order!)
      setDoType(1)
    }
    return (
      <div>
      <h3>Your Orders</h3>
      <List
        key = {position}
        className="order-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item key = {item.orderId}
            actions={item.status==order_status.CREATE?[<Button onClick={()=>{payOrder(item)}}>Pay order</Button>,
            <Button onClick={()=>{cancelOrder(item)}}>Cancel order</Button>]:[]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.goodsList?item.goodsList[0].pic:null} />}
                title={<b>{item.orderId} {"ORDER "+getOrderStatus(item.status!)}</b>}
                description={<div key = {"div1:"+item.orderId}><div key = {"div11:"+item.orderId}>Delivered to {item.location}</div>
                <div key = {"div12:"+item.orderId}>Order time {(new String(item.orderTime)).replace("T"," ")}</div></div>}
              />
              <div key = {"div"+item.orderId}>{item.goodsList?item.goodsList.map( (ele)=>{return <div key={"elediv"+ele.goodsId}>{ele.name} Price: {ele.price} Quantity: {ele.count}</div>}):null}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <OrderDetailModal click={showClick} order={selectedOrder} type={doType} paymethods = {paymethods} resetOrder={resetOrder}/>
      </div>
    );
}

export default CustomerOrders;

