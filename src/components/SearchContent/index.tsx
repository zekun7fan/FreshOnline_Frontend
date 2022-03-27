import React, {useState} from "react";

import {Row, Col, Layout, Pagination} from "antd";

export default function SearchContent() {

    const [goods_list, setGoods_list] = useState([])

    return (
        <Layout>
            <Row key="2" >
                {goods_list.length > 0
                    ? (goods_list).map(item => (
                        <Col span={6}
                             // key={item.id}
                        >
                            {/*<GoodsOverviewCard id={item.id} name={item.name} rate={item.rate} rate_count={item.rateCount}*/}
                            {/*                   price={item.price} onsale={item.onsale} type={item.type} sale_price={item.salePrice}*/}
                            {/*                   pic={item.pic}/>*/}
                            item
                        </Col>
                    ))
                    : <div>No Goods</div>
                }
            </Row>
            <Layout>
                <Row justify="center" align="middle">
                    <Col>
                        <Pagination
                            // defaultCurrent={page} onChange={this.onChangePage}
                            // total={goods_total} pageSize={num_per_row*rows_per_page}
                        />
                    </Col>
                </Row>
            </Layout>
        </Layout>
    );
}