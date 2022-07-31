import React, {useEffect, useState} from "react";
import {Button, Checkbox, Col, Divider, InputNumber, Layout, Menu, Radio, Row} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {AdminSearchParam} from "../../net/reqParam";
import {update_search_params} from "../../redux/actions/search_params";
import {onQuery} from "../SearchHeader";
import {update_search_results} from "../../redux/actions/search_results";

const { SubMenu } = Menu;
const { Content} = Layout;

export function SearchSider() {
    const [selected_brands, setSelected_brands] = useState<string[]>([])
    const [min_price, setMin_price] = useState<number>(0)
    const [max_price, setMax_price] = useState<number>(0)
    const [sort_type, setSort_Type] = useState<number>(0)
    const dispatch = useDispatch()
    const cur_search_param = useSelector((state: RootState) => {
        return state.search_params
    }, shallowEqual)
    const search_brands = useSelector((state: RootState) => {
        return state.search_brands
    }, shallowEqual)

    useEffect(() =>{
        setSelected_brands([])
        setMin_price(0)
        setMax_price(0)
        setSort_Type(0)
    }, [cur_search_param.category_id, cur_search_param.keyword])

    const onQueryFilterResult = () => {
        const search_param: AdminSearchParam = {
            ...cur_search_param,
            brands: selected_brands,
            price_low: min_price,
            price_high: max_price,
            sort_type: sort_type,
            page: 1
        }
        dispatch(update_search_params(search_param))
        onQuery(search_param).then(r => {
            if (typeof r === 'undefined') return
            dispatch(update_search_results(r.goods_list))
        })
    }

    return { search_brands, selected_brands, setSelected_brands, min_price, setMin_price,
        max_price, setMax_price, sort_type, setSort_Type, onQueryFilterResult }
}

export default function SearchSiderUI() {

    const { search_brands, selected_brands, setSelected_brands, min_price, setMin_price,
        max_price, setMax_price, sort_type, setSort_Type, onQueryFilterResult } = SearchSider()

    return (
        <Content
            style={{
                background: 'white',
                minHeight: 1710,
            }}
            className="sider-content"
        >
            <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}
                  defaultOpenKeys={['sub1', 'sub2', 'sub3']}>

                <SubMenu key="sub1" icon={<UserOutlined />} title="Brands">
                    <Checkbox.Group
                        style={{ width: '100%' }}
                        onChange={(value:any[]) => {setSelected_brands(value as string[])}}
                        value={selected_brands}
                    >
                        <Row key="sub1Row">
                            {
                                search_brands !== null ?
                                    search_brands.map(item => (
                                        <Col offset={4} key={"sub1RowCol"+item}>
                                            <Checkbox key={"sub1RowCol.Checkbox"+item} value={item}>{item}</Checkbox>
                                        </Col>
                                    )):[]
                            }
                        </Row>
                    </Checkbox.Group>
                </SubMenu>

                <SubMenu key="sub2" icon={<UserOutlined />} title="Price Selection">
                    <Row>
                        <Col offset={4}>
                            <InputNumber key="minInput"
                                         min={0} max={9999} precision={0} addonBefore="Min"
                                         value={min_price}
                                         onChange={(value:number) => {setMin_price(value)}}
                            />
                        </Col>
                        <Col offset={4}>
                            <InputNumber key="maxInput"
                                         min={0} max={9999} precision={0} addonBefore="Max"
                                         value={max_price}
                                         onChange={(value:number) => {setMax_price(value)}}
                            />
                        </Col>
                    </Row>
                </SubMenu>

                <SubMenu key="sub3" icon={<UserOutlined />} title="Sort Type">
                    <Radio.Group
                        onChange={(e) => {setSort_Type(e.target.value)}}
                        value={sort_type}
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
            </Menu>
            <Divider dashed={true} />
            <Row justify="center" >
                <Button type="primary" onClick={onQueryFilterResult}>Apply Filter</Button>
            </Row>
        </Content>
    );
}