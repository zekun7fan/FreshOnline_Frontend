import React, {useEffect, useState} from "react";

import {Row, Col, Layout, Pagination} from "antd";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {update_search_params} from "../../redux/actions/search_params";
import {onQuery} from "../SearchHeader";
import {update_search_results} from "../../redux/actions/search_results";
import GoodsOverviewCard, {OverviewCardProps} from "../GoodsOverviewCard";
import {Goods} from "../../net/reqBody";

export function SearchContent() {
    const [search_results, setSearch_results] = useState<OverviewCardProps[]>([])
    const dispatch = useDispatch()
    const cur_search_results = useSelector((state:RootState) => {
        return state.search_results
    }, shallowEqual)
    const cur_search_param = useSelector((state: RootState) => {
        return state.search_params
    }, shallowEqual)

    useEffect(() =>{
        const card_list:OverviewCardProps[] = []
        for (let good of cur_search_results) {
            const card:OverviewCardProps = {
                id:good.id!,
                name:good.name,
                rate:good.rate!,
                rate_count:good.rateCount!,
                price:good.price,
                onsale:good.onsale?true:false,
                sale_price:good.salePrice,
                type:good.type,
                pic:good.pic,
                show_button:false,
                in_cart:0
            }
            card_list.push(card)
        }
        setSearch_results(card_list)
    }, [cur_search_results])

    const onChange = (pageNumber: number) => {
        console.log('pageNumber:', pageNumber)
        const search_param = {
            ...cur_search_param,
            page: pageNumber
        }
        dispatch(update_search_params(search_param))
        onQuery(search_param).then(r => {
            if (typeof r === 'undefined') return
            dispatch(update_search_results(r.goods_list))
        })
    }

    return { search_results, onChange, cur_search_results }
}

export default function SearchContentUI() {

    const { search_results, onChange, cur_search_results } = SearchContent()

    return (
        <Layout>
            <Row key="2" >
                {search_results.length > 0
                    ? (search_results).map(item => (
                        <Col span={6} key={item.id}>
                            <GoodsOverviewCard {...item}/>
                        </Col>
                    ))
                    : <div>No Goods</div>
                }
            </Row>
            <Layout>
                <Row justify="center" align="middle">
                    <Col>
                        <Pagination
                            defaultCurrent={1} onChange={onChange}
                            total={cur_search_results.length} pageSize={20}
                        />
                    </Col>
                </Row>
            </Layout>
        </Layout>
    );
}