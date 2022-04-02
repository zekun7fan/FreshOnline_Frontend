import React, {useEffect, useRef, useState} from 'react';
import { Divider,Card, Col, Row } from 'antd';
import {queryWeeklySpecial} from "../../net/";
import {StockedGoods} from "../../utils/javamodel";
import GoodsOverviewCard,{OverviewCardProps} from "../GoodsOverviewCard";
import "./index.css"

/**
 * @author Zetian Huang
 */
 function WeeklySpeicalPanl() {

    const [data, setData] = useState<Array<StockedGoods>>([])

    const formatData = () => {
        const rownum = 5
        if(data.length==0) return []
        const rows=[]
        const maxitem = Math.min(10,data.length)
        const rowlength =Math.floor(maxitem/rownum)
        for(let i=0; i<rowlength; i++){
            const cols=[]
             // rows.push(<Divider key={"div"+i} />)
             for(let j=0; j<rownum; j++){
                const xx = rownum*i+j
                const card:OverviewCardProps = {
                    id:data[xx].id!,
                    name:data[xx].name!,
                    rate:data[xx].rate!,
                    rate_count:data[xx].rateCount!,
                    price:data[xx].price!,
                    onsale:data[xx].onsale?true:false,
                    sale_price:data[xx].salePrice,
                    type:data[xx].type!,
                    pic:data[xx].pic!,
                    show_button:true,
                    in_cart:0
                }
                cols.push(<Col key={"entry"+i*rownum+j} span={4.5}>
                <GoodsOverviewCard {...card}/>  
                                   </Col>)
             }
             rows.push(<Row key={"row"+i} gutter={16} justify={"center"}>{cols}</Row>)
         }
        return rows
    }

    useEffect(() => {
        update()
        return () => {
        };
    }, [])
    const update = async () => {
        const resp = await queryWeeklySpecial()
        const res = resp.data
        if (res.code === 0){
            setData(res.data);
         }
    }

    return (
        <div>
            <Divider />
                <div id="weekly_special">
                    <h1 id="text"> WEEKLY SPECIALS</h1>
                </div>
                {formatData()}
            <Divider />
        </div>
    );
}

export default WeeklySpeicalPanl;
