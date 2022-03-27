import React, {useState} from "react";
import {Button, Checkbox, Col, Divider, InputNumber, Layout, Menu, Radio, Row} from 'antd';
import {UserOutlined} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Content} = Layout;

export default function SearchSider() {

    return (
        <Content
            style={{
                background: 'white',
                // minHeight: height,
            }}
            className="sider-content"
        >
            <Menu
                mode="inline"
                defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" icon={<UserOutlined />} title="Brands">
                    <Checkbox.Group
                        // key={search_selected_brands}
                        style={{ width: '100%' }}
                        // onChange={this.onChangeSelectedBrands}
                        // defaultValue={search_selected_brands}
                    >
                        {/*<Row>*/}
                        {/*    {*/}
                        {/*        search_brands.map(item => (*/}
                        {/*            <Col offset={4} key={"Row.Col"+item}>*/}
                        {/*                <Checkbox value={item} key={"Row.Col.Checkbox"+item}>{item}</Checkbox>*/}
                        {/*            </Col>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</Row>*/}
                    </Checkbox.Group>
                </SubMenu>
                <SubMenu key="sub2" icon={<UserOutlined />} title="Price Selection">
                    <Row>
                        <Col offset={4}>
                            <InputNumber key="minInput" min={0} max={9999}
                                         // value={search_min_price}
                                         precision={0} addonBefore="Min"
                                         // onChange={this.onChangeMinPrice}
                            />
                        </Col>
                        <Col offset={4}>
                            <InputNumber key="maxInput" min={0} max={9999}
                                         // value={search_max_price}
                                         precision={0} addonBefore="Max"
                                         // onChange={this.onChangeMaxPrice}
                            />
                        </Col>
                    </Row>
                </SubMenu>
                <SubMenu key="sub3" icon={<UserOutlined />} title="Sort Type">
                    <Radio.Group
                        // onChange={this.onChangeSortType}
                        // value={search_sort_type}
                    >
                        <Row gutter={[0, 8]}>
                            <Col span={20} offset={4}>
                                <Radio value={1}>Price: Low to High</Radio>
                            </Col>
                            <Col span={20} offset={4}>
                                <Radio value={2}>Price: High to Low</Radio>
                            </Col>
                            <Col span={20} offset={4}>
                                <Radio value={4}>Top Sellers</Radio>
                            </Col>
                        </Row>
                    </Radio.Group>
                </SubMenu>
                <Divider dashed />
                <Row justify="center">
                    <Button type="primary"
                            // onClick={this.onQueryFilterResult}
                    >Apply Filter</Button>
                </Row>
            </Menu>
        </Content>
    );
}