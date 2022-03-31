import { Divider,Card, Col, Row } from 'antd';
import {getCategoryTree,queryCategoryGoods} from "../../net";
//import GoodsOverviewCard from "../GoodsOverviewCard";
import React, {useEffect, useRef, useState} from 'react';
import {queryWeeklySpecial} from "../../net/";
import {StockedGoods} from "../../utils/javamodel";
import {CategoryNode} from "../../utils/utils";


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
            rows.push(<Divider />)
            rows.push(<h1>{data[k].name}</h1>)
            const categoods=data[k].goods
            const rownum = 4
            const rowlength = categoods.length/rownum
            for(let i=0; i<rowlength; i++){
                const cols=[]
                const collen = Math.min(rownum,categoods.length-rownum*i)
                 for(let j=0; j<collen; j++){
                    const xx = rownum*i+j
                    cols.push(<Col span={6}>
                        <Card title={categoods[xx].name} bordered={false} key={categoods[xx].id}>{categoods[xx].price}</Card>
                    </Col>)
                 }
                 rows.push(<Row gutter={16}>{cols}</Row>)
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
/* <GoodsOverviewCard id={categoods[xx].id} name={categoods[xx].name} rate={categoods[xx].rate} rate_count={categoods[xx].rateCount}
price={categoods[xx].price} onsale={categoods[xx].onsale} type={categoods[xx].type} sale_price={categoods[xx].salePrice}
pic={categoods[xx].pic}/> */


export default CatogoryGoodsPanel;
