import React, {useEffect, useRef, useState} from 'react';
import { Divider,Card, Col, Row } from 'antd';
import {queryWeeklySpecial} from "../../net/";
import {StockedGoods} from "../../utils/javamodel";
import GoodsOverviewCard,{OverviewCardProps} from "../GoodsOverviewCard";

/**
 * @author Zetian Huang
 */

export function format(data: Array<StockedGoods>) {
    if(data.length==0) return []

    const card_list:OverviewCardProps[] = []
    for (let good of data){
        const card:OverviewCardProps = {
            id:good.id!,
            name:good.name!,
            rate:good.rate!,
            rate_count:good.rateCount!,
            price:good.price!,
            onsale:good.onsale?true:false,
            sale_price:good.salePrice,
            type:good.type!,
            pic:good.pic!,
            show_button:false,
            in_cart:0
        }
        card_list.push(card)
        if (card_list.length >= 10) return card_list
    }
    return card_list
}

export function WeeklySpecialPanl() {
    const [data, setData] = useState<Array<StockedGoods>>([])

    useEffect(() => {
        update().then()
        return () => {
        };
    }, [])

    const update = async () => {
        const resp = await queryWeeklySpecial()
        const res = resp.data
        if (res.code === 0){
            setData(res.data)
        }
    }

    return { data, update }
}

 export default function WeeklySpeicalPanlUI() {

    const { data } = WeeklySpecialPanl()

    return (
        <div>
            <Divider />
                <div id="weekly_special">
                    <h1 id="text"> WEEKLY SPECIALS</h1>
                </div>
                <Row key={"row"} gutter={16} justify={"center"}>
                    {
                        format(data).map(item => (
                            <Col key={"entry"+item.id} span={4.5}>
                                <GoodsOverviewCard {...item}/>
                            </Col>
                        ))
                    }
                </Row>
            <Divider />
        </div>
    );
}
