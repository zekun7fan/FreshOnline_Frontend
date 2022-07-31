import React, {useEffect, useState} from 'react';

import {getCartGoods, queryUser, checkOut} from '../../net';
import GoodsOverviewCard from '../GoodsOverviewCard';
import {getUserId} from "../../utils/user";
import {StockedGoods} from '../../utils/javamodel';
import {useNavigate} from 'react-router-dom';
import {Modal, Input, Radio, Space, Button, message, Select} from 'antd';
import {User} from "../../utils/javamodel";
import {Resp} from "../../net/resp";


const {Option} = Select;

interface fetchDataEntry {
    goodsId: number,
    stockedGoods: StockedGoods,
    count: number
}


function GoodsOverviewDisplay() {

    const [goods, set_goods] = useState<Array<fetchDataEntry>>([]);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [address, set_address] = useState<Array<string>>([]);
    const [selected_address, set_selected_address] = useState<string>("");
    let navigate = useNavigate();


    const fetchData = async () => {
        const user_id = getUserId();
        if (user_id == null) {
            navigate("/login");
            return;
        }
        const raw = await getCartGoods(user_id!);
        const resp: Resp = raw.data
        if (resp.code == 0) {
            set_goods(resp.data as Array<fetchDataEntry>)
        }
    }

    useEffect(() => {
        fetchData().catch();
        fetchUserAddresses().catch();
    }, [])


    const fetchUserAddresses = async () => {
        let user_id = getUserId();
        const resp = await queryUser(user_id!);
        const res = resp.data
        if (res.code === 0) {
            const user: User = res.data
            const location = user.location;
            if (location == null) {
                return;
            }
            const array = location.split(",")
            set_address(array);
        }
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        if (selected_address == "") {
            message.warn("you must select a valid address")
            return;
        }
        if (confirmLoading) {
            return
        }
        setConfirmLoading(true);
        const raw = await checkOut(getUserId()!, selected_address);
        const resp: Resp = raw.data
        if (resp.code != 0) {
            message.warn(resp.msg);
            return;
        }
        setConfirmLoading(false);
        setTimeout(() => {
            navigate("/customer/orders");
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    let total: number = 0;
    for (let i = 0; i < goods.length; i++) {
        total += goods[i].stockedGoods.onsale ? goods[i].stockedGoods.salePrice! * goods[i].count : goods[i].stockedGoods.price! * goods[i].count;
    }


    if (goods.length == 0) {
        return (<div style={{height: 500, paddingTop: 250}}><h2>There is nothing in the cart yet, Please browse our <a
            onClick={() => navigate("/")}>products</a></h2></div>)
    }

    return (
        <div>
            <div style={{textAlign: "left"}}>
                {goods.map(
                    good => {
                        return (
                            <GoodsOverviewCard key={good.stockedGoods.id}
                                               id={good.stockedGoods.id}
                                               name={good.stockedGoods.name!}
                                               rate={good.stockedGoods.rate!}
                                               rate_count={good.stockedGoods.rateCount!}
                                               price={good.stockedGoods.price!}
                                               onsale={good.stockedGoods.onsale === 1}
                                               sale_price={good.stockedGoods.salePrice}
                                               type={good.stockedGoods.type!}
                                               pic={good.stockedGoods.pic!}
                                               show_button={true}
                                               in_cart={good.count}/>
                        )
                    }
                )}
            </div>
            <div style={{textAlign: "center", marginTop: 100, marginBottom: 100, height: 100}}>
                <h1>Total: $ {total} </h1>
                <Button type="primary" onClick={showModal}>Checkout</Button><br/>
            </div>
            <Modal
                title="Checkout confirmation"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                okText={"place order"}
                onCancel={handleCancel}>
                <Space>
                    <h2>Delivery Address: </h2>
                    <Select style={{width: 120}} onChange={(val) => {
                        set_selected_address(val)
                    }}>
                        <Option key={-1} value={""}>NO ADDRESS</Option>
                        {address.map((address) => {
                            return (<Option key={address} value={address}>{address}</Option>)
                        })}
                    </Select>
                </Space>

            </Modal>
        </div>
    )

}

export default GoodsOverviewDisplay;