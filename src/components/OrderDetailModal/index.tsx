import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Modal, Button ,Descriptions,List,Row,Col,Image, Radio, Space, RadioChangeEvent, message} from 'antd';
import {OrderDetail, SaledGoods} from "../../utils/javamodel";
import { getOrderStatus, getPaytype, order_status, parseCardNumber } from '../../utils/utils';
import {Link} from "react-router-dom";
import { cancelOrder, getPaymentMethodByUserId, payOrder } from '../../net';
import { Resp } from '../../net/resp';
import { PaymentMethod } from '../../net/reqBody';
import Select from 'rc-select';
const { Option } = Select;
interface OrderProps{
  order?:OrderDetail,
  click:number
  type?:number
  paymethods:Array<PaymentMethod>
  resetOrder?:(order:OrderDetail)=>void
}

export default function OrderDetailModal(props:OrderProps){

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');  

    useEffect(() => {
      if(props.click !=0){
         setVisible(true)
      }
      switch(props.type){
        case 1: setModalText( "Confirm Cancel");break;
        case 2: setModalText ("Confirm Payment");break;
        default: setModalText( "Ok");break;
      }
      return () => {
      };
    }, [props.click])  

      const handleOk = () => {
        setModalText('Processing');
        setConfirmLoading(true);
        setTimeout(() => {
          switch(props.type){
            case 1: doCancelOrder();break;
            case 2: doPayOrder();break;
            default: break;
          }
          setConfirmLoading(false);
        }, 2000);
      };
    
      const doPayOrder = async () => {
        if(order.paymentMethodId==undefined||order.paymentMethodId<1){
          message.info("Choose a payment method!")
        }else{
          const raw_resp = await payOrder(order);
          const resp: Resp = raw_resp.data
          if (resp.code === 0){
            message.info(resp.msg)
            order.status = order_status.PAID
            setVisible(false)
            props.resetOrder?props.resetOrder(order):console.log()
            ;
          }
        }
    };

    const doCancelOrder = async () => {
      const raw_resp = await cancelOrder(order!);
      const resp: Resp = raw_resp.data
      if (resp.code === 0){
        message.info(resp.msg)
        order.status = order_status.CANCEL
        setVisible(false);
        props.resetOrder?props.resetOrder(order):console.log()
      }
  };

      const handleCancel = () => {
        setVisible(false);
      };

      const order:OrderDetail = props.order!
      order.total = 0
      order.goodsList?.map((goods:SaledGoods)=>{
        order.total=goods.price!+order.total!
      })

      const handleChange =(value:RadioChangeEvent) => {
        order.paymentMethodId = value.target.value
      }

      const options:Array<JSX.Element> = props.paymethods.map(d => <Radio key={d.id} value={d.id}>{getPaytype(d.paymentType)+":"+parseCardNumber(d.details)}</Radio>);
      return (
          <Modal
            title="Order Information"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={800}
            okText={modalText}
          >
              <Descriptions bordered column={3}>
                <Descriptions.Item label="ORDER PLACED" span={2}>{(new String(order.orderTime)).replace("T"," ")}</Descriptions.Item>
                <Descriptions.Item label="ORDER #"span={1}>{order.orderId}</Descriptions.Item>
                <Descriptions.Item label="SHIP TO"span={2}>{order.location}</Descriptions.Item>
                <Descriptions.Item label="Order Status"span={1}><h3>{getOrderStatus(0)}</h3></Descriptions.Item>
              </Descriptions>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={order.goodsList}
                renderItem={item => (
                  <List.Item key={item.orderId+":"+item.goodsId} actions={[]}>
                    <table><tbody><tr>
                    <td style={{verticalAlign:"te"}}><Image  width={272} alt="logo" src={item.pic}/></td>
                    <td colSpan={2}></td>
                    <td><Descriptions title={item.name} contentStyle={{verticalAlign:"top"}}>
                    <Descriptions.Item label="Count">{item.count}</Descriptions.Item>
                    <Descriptions.Item label="Price">{item.price}</Descriptions.Item>
                    </Descriptions></td>
                    </tr></tbody></table>
                  </List.Item>
                )}
                bordered
              />

          <Descriptions column={3}>
          <Descriptions.Item label="PAYMENT METHOD" span={2}>
          <Radio.Group onChange={(handleChange)} defaultValue={order.paymentMethodId} key = {"radio"+order.orderId}>
            <Space direction="vertical">
              {props.type==2?options:null}
            </Space>
          </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item label="TOTAL"span={1}><h3>{"$"+order.total}</h3></Descriptions.Item>
          </Descriptions>
          <Link to={{pathname:"/customer/payment"}}>Add payment method</Link>
          </Modal>
      );
}

// defaultValue={parseCardNumber(props.paymethods.find((method)=>{return method.id===order.paymentMethodId})?.details!).toString()}