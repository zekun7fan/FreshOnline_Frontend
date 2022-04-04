import React, { useEffect, useRef, useState } from 'react';

import { getCartGoods, queryUser, checkOut } from '../../net';
import GoodsOverviewCard from '../GoodsOverviewCard';
import { getUserId } from "../../utils/user";
import { StockedGoods } from '../../utils/javamodel';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Input, Radio, Space } from 'antd';
import { User } from "../../utils/javamodel";
import { mkdirSync } from 'fs';

interface fetchDataEntry {
    goodsId: number,
    stockedGoods: StockedGoods,
    count: number
}

function GoodsOverviewDisplay() {

    const [goods, set_goods] = useState<Array<fetchDataEntry>>(new Array<fetchDataEntry>());
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [address, set_address] = useState<Array<string>>(new Array<string>());
    const [selected_address, set_selected_address] = useState<string>("");
    const [new_address, set_new_address] = useState<string>("");
    let navigate = useNavigate();
    const fetchData = async () => {
        let user_id = getUserId();
        if (!user_id) {
            navigate("/login");
            return
        }
        try {
            const response = await getCartGoods(user_id!);
            set_goods(response.data.data)
        } catch (e) {
            console.log(e)
        }

    }


    useEffect(() => {
        fetchData();
    }, [])



    if (goods.length == 0) {
        return (<div style={{height:500, paddingTop:250}}><h2>There is nothing in the cart yet, Please browse our <a onClick={() => navigate("/")}>products</a></h2></div>)
    }



    // modal and related functions

    const fetchUserAddresses = async () => {
        let user_id = getUserId();
        const resp = await queryUser(user_id!);
        const res = resp.data
        if (res.code === 0) {
            const user: User = res.data
            let location = new String(user.location)
            var array = location.split(",")
            console.log(array);
            set_address(array);
        }

    }

    const showModal = () => {
        fetchUserAddresses();
        setVisible(true);
    };

    const handleOk = async () => {
        let user_id = getUserId();
        
        const response = await checkOut(user_id!, selected_address == "" ? new_address : selected_address);
        if (response.data.code != 0) {
            console.log(response.data.code);
            const msg = response.data.msg;
            console.log(msg);
            if (Array.isArray(msg)) {
                let alertString: string = "Sorry the following products in your cart has a shortage:"
                for (let i = 0; i < msg.length; i++) {
                    let id: number = msg[i];
                    for (let j = 0; j < goods.length; j++) {
                        if (goods[j].goodsId == id) {
                            alertString += " \"" + goods[j].stockedGoods.name + "\" ";
                        }
                    }

                }
                alert(alertString);
                return
            }
        }
        setConfirmLoading(true);
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


    return (
        <div >
            <div style={{ textAlign: "left" }}>
                {goods.map(
                    (good => {
                        return (
                            <GoodsOverviewCard key={good.goodsId}
                                id={good.goodsId}
                                name={good.stockedGoods.name!}
                                rate={good.stockedGoods.rate!}
                                rate_count={good.stockedGoods.rateCount!}
                                price={good.stockedGoods.price!}
                                onsale={good.stockedGoods.onsale ? true : false}
                                sale_price={good.stockedGoods.salePrice}
                                type={good.stockedGoods.type!}
                                pic={good.stockedGoods.pic!}
                                show_button={true}
                                in_cart={good.count} />)
                    })
                )}
            </div>
            <div style={{ textAlign: "center", marginTop: 100, marginBottom: 100, height: 100 }}>
                Total: $ {total} <Button type="primary" onClick={showModal}>Checkout</Button><br />
            </div>
            <Modal title="Checkout confirmation" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
                <Radio.Group onChange={(e) => { set_selected_address(e.target.value) }} value={selected_address}>
                    <Space direction="vertical">
                        {address.map(
                            (address) => {
                                return (<Radio key={address} value={address}>{address}</Radio>)
                            }
                        )}
                        <Radio value={""}>
                            New Address:
                            {selected_address == "" ? <Input onChange={(e) => { console.log(e.target.value); set_new_address(e.target.value) }} style={{ width: 400, marginLeft: 10 }} /> : null}
                        </Radio>
                    </Space>
                </Radio.Group>

            </Modal>
        </div>
    );
}

export default GoodsOverviewDisplay;