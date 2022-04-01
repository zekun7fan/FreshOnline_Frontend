import { Divider,Card, Col, Row } from 'antd';
import {getCategoryTree,queryCategoryGoods} from "../../net";
import React, {useEffect, useRef, useState} from 'react';
import {queryWeeklySpecial} from "../../net/";
import {StockedGoods} from "../../utils/javamodel";
import {CategoryNode} from "../../utils/utils";
import GoodsOverviewCard,{OverviewCardProps} from "../GoodsOverviewCard";


/**
 * @author Zetian Huang
 */
interface CatogoryGoods extends CategoryNode{
    goods:Array<StockedGoods>
}

function CatogoryGoodsPanel() {

    const [data, setData] = useState<Array<CatogoryGoods>>([])

    useEffect(() => {
        componentDidMount()
        return () => {
        };
    }, [])

    const formatData = () => {
        const rows=[]
        for(let k=0;k<data.length;k++){
            rows.push(<Divider key={"div"+k}/>)
            rows.push(<h1 key={"h1s"+k}>{data[k].name}</h1>)
            const categoods=data[k].goods
            const rownum = 5
            const maxitem = Math.max(5,categoods.length)
            const rowlength = maxitem/rownum
            for(let i=0; i<rowlength; i++){
                const cols=[]
                const collen = Math.min(rownum,categoods.length-rownum*i)
                 for(let j=0; j<collen; j++){
                    const xx = rownum*i+j
                    const card:OverviewCardProps = {
                        id:categoods[xx].id!,
                        name:categoods[xx].name!,
                        rate:categoods[xx].rate!,
                        rate_count:categoods[xx].rateCount!,
                        price:categoods[xx].price!,
                        onsale:categoods[xx].onsale?true:false,
                        sale_price:categoods[xx].salePrice,
                        type:categoods[xx].type!,
                        pic:categoods[xx].pic!,
                        show_button:true,
                        in_cart:0
                    }
                    cols.push(<Col key = {"entry"+(i+data.length*k)*rownum+j} span={6}>
                        <GoodsOverviewCard {...card}/>
                    </Col>)
                 }
                 rows.push(<Row key={"row"+i+data.length*k} gutter={16}>{cols}</Row>)
             }
         }
        return rows
    }
    const componentDidMount = async () => {
        const resp = await getCategoryTree()
        const res = resp.data
        if (res.code === 0){
            const cate:Array<CategoryNode> = res.data
            const l = cate.length
            var newData = new Array<CatogoryGoods>()
            for(let i=0;i<l;i++){
                const idList = findLeaves(cate[i])
                const resp2 = await queryCategoryGoods(idList)
                if (resp2.data.code === 0){
                    const goodsdata:Array<StockedGoods> = resp2.data.data
                    newData.push({id:cate[i].id, name:cate[i].name, level:cate[i].level, goods:goodsdata,children:[]})                    
                }
            }
            setData(newData)
         }
    }

    const findLeaves = (node:CategoryNode) =>{
        var idList=new Array<number>()
        const l = node.children.length
        if(l!=0){
            for(let i=0;i<l;i++){
                idList = idList.concat(findLeaves(node.children[i]))
            }
        }else{
            idList.push(node.id)
        }
        return idList
    }


    const element = (
        <div>
            <Divider />
            <h1> Goods by category</h1>
                {formatData()}
            <Divider />
        </div>)

    return element;

}
export default CatogoryGoodsPanel;
