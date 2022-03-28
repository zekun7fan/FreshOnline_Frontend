import React, {useState} from "react";

import {Row, Col, Layout, Pagination} from "antd";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";

export default function SearchContent() {

    const cur_search_results = useSelector((state:RootState) => {
        return state.search_results
    }, shallowEqual)

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
                            defaultCurrent={1}
                            total={cur_search_results.length} pageSize={20}
                        />
                    </Col>
                </Row>
            </Layout>
        </Layout>
    );
}