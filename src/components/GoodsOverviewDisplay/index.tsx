import React, {useEffect, useRef, useState} from 'react';
import { Rate, Card, Button } from 'antd';
import index from './index.module.css'
import { updateToCart, removeFromCart, getCartGoods, addToCart } from '../../net';
import GoodsOverviewCard from '../GoodsOverviewCard';
import { goods } from '../../net/url';
import {getUserId} from "../../utils/user";
import { StockedGoods } from '../../utils/javamodel';
import { useNavigate, Navigate } from 'react-router-dom';

interface fetchDataEntry {
    goodsId:number,
    stockedGoods:StockedGoods,
    count:number
}

function GoodsOverviewDisplay() {

    const [goods, set_goods] = useState<Array<fetchDataEntry>>(new Array<fetchDataEntry>());
    const [redirect, set_redirect] = useState<string>("");
    
    const fetchData = async () => {
        let user_id = getUserId();
        if (!user_id){
            console.log("esadads")
            set_redirect("/login");
            return
        }
        try {
            console.log(user_id);
            const response = await getCartGoods(user_id!);
            set_goods( response.data.data )
        } catch (e) {
            console.log(e)
        }

    }

    

    useEffect(() => {
        fetchData();
    }, [])

    console.log(goods)

    if (redirect){
        return (<Navigate to={redirect}></Navigate>)
    }




    return (
        <div>
            {goods.map(
                (good => {
                    return (
                        <GoodsOverviewCard key={good.goodsId}
                            id={good.goodsId}
                            name={good.stockedGoods.name!}
                            rate={good.stockedGoods.rate!}
                            rate_count={good.stockedGoods.rateCount!}
                            price={good.stockedGoods.price!}
                            onsale={good.stockedGoods.onsale?true:false}
                            sale_price={good.stockedGoods.salePrice}
                            type={good.stockedGoods.type!}
                            pic={good.stockedGoods.pic!}
                            show_button={true}
                            in_cart={good.count} />)
                })
            )}
            <div>

            </div>
        </div>
    );
}

export default GoodsOverviewDisplay;