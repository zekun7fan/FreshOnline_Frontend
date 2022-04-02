import React, {useEffect, useRef, useState} from 'react';

import {  getCartGoods} from '../../net';
import GoodsOverviewCard from '../GoodsOverviewCard';
import {getUserId} from "../../utils/user";
import { StockedGoods } from '../../utils/javamodel';
import { useNavigate } from 'react-router-dom';

interface fetchDataEntry {
    goodsId:number,
    stockedGoods:StockedGoods,
    count:number
}

function GoodsOverviewDisplay() {

    const [goods, set_goods] = useState<Array<fetchDataEntry>>(new Array<fetchDataEntry>());
    let navigate = useNavigate();
    const fetchData = async () => {
        let user_id = getUserId();
        if (!user_id){
            navigate("/login");
            return
        }
        try {
            const response = await getCartGoods(user_id!);
            set_goods( response.data.data )
        } catch (e) {
            console.log(e)
        }

    }

    const goto = (to:string) =>{
        navigate(to);
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (goods.length == 0){
        return (<div>There is nothing in the cart yet, Please browse our <a onClick={()=>goto("/")}>products</a></div>)
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