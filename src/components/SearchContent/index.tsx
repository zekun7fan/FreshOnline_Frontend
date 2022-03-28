import React, {useState} from "react";

import {Row, Col, Layout, Pagination} from "antd";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {update_search_params} from "../../redux/actions/search_params";
import {onQuery} from "../SearchHeader";
import {update_search_results} from "../../redux/actions/search_results";

export default function SearchContent() {

    const dispatch = useDispatch()
    const cur_search_results = useSelector((state:RootState) => {
        return state.search_results
    }, shallowEqual)
    const cur_search_param = useSelector((state: RootState) => {
        return state.search_params
    }, shallowEqual)

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

    return (
        <Layout>
            <Row key="2" >
                {cur_search_results.length > 0
                    ? (cur_search_results).map(item => (
                        <Col span={6} key={item.id}>
                            {/*<GoodsOverviewCard id={item.id} name={item.name} rate={item.rate} rate_count={item.rateCount}*/}
                            {/*                   price={item.price} onsale={item.onsale} type={item.type} sale_price={item.salePrice}*/}
                            {/*                   pic={item.pic}/>*/}
                            {item.id}
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