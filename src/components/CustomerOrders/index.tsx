import React, {useEffect, useRef, useState} from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import {getUserId} from "../../utils/user";
import {getOrderStatus} from "../../utils/utils";
import {queryOrderByUser} from "../../net";
import {OrderDetail} from "../../utils/javamodel";
/**
 * @author Zetian Huang
 */

const pageCount = 5
function CustomerOrders(){

    const [list, setList] = useState<Array<OrderDetail>>([])
    const [position, setPosition] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        loadData()
        return () => {
        };
    }, [])

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

    return (
      <div>
      <h3>Your Orders</h3>
      <List
        className="order-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-more">View your item</a>]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.goodsList?item.goodsList[0].pic:null} />}
                title={<h3>{item.orderId} {getOrderStatus(item.status)}</h3>}
                description={<div><div>Delivered to {item.location}</div><div>Order time {(new String(item.orderTime)).replace("T"," ")}</div></div>}
              />
              <div>{item.goodsList?item.goodsList.map( (ele)=>{return <div>{ele.name} Price: {ele.price} Quantity: {ele.count}</div>}):null}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      </div>
    );
}

export default CustomerOrders;

