import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import {Button, Input, Space, TreeSelect, Select, InputNumber, Modal} from "antd";
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import {CategoryNode, getAllLeafOfSpecificNode, renderTreeNode} from "../../utils/utils";
import AdminAddGoodsPanel from "../AdminAddGoodsPanel";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {AdminSearchParam} from "../../net/reqParam";
import {category} from "../../net/url";
import {getCategoryTree, getGoods} from "../../net";
import {GoodsInfoBySearch, Resp} from "../../net/resp";
import {update_admin_search_header_params} from "../../redux/actions/admin_search_header_params";
import {update_admin_goods_data} from "../../redux/actions/admin_list_data";
import {update_admin_pagination_params} from "../../redux/actions/admin_pagination";
import {update_category} from "../../redux/actions/category_tree";


const {Option} = Select


const empty_header_params: AdminSearchParam = {
    category_id: 0,
    keyword: '',
    price_low: 0,
    price_high: 0,
    sort_type: 0,
    page: 1

}

export function AdminSearchHeader() {

    const dispatch = useDispatch()

    const [showAddGoodsPanel, setShowAddGoodsPanel] = useState<boolean>(false)

    const categoryTree = useSelector((state: RootState) => {
        return state.category_tree;
    }, shallowEqual)

    const adminSearchParams = useSelector((state: RootState) => {
        return state.admin_search_header_params;
    }, shallowEqual)


    const queryTree = async () => {
        const raw = await getCategoryTree()
        const resp: Resp = raw.data
        if (resp.code === 0){
            const tree: CategoryNode[] = resp.data as CategoryNode[];
            dispatch(update_category(tree))
        }
    }

    useEffect(() => {
        queryTree().catch()
    },[])


    const onAddGoods = () => {
        setShowAddGoodsPanel( true)
    };


    const onCategoryChange = async (category_id: number) => {
        const header_params = {
            ...empty_header_params,
            category_id: category_id,
        }
        await refreshPage(header_params, true)

    };


    const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const header_params = {
            ...adminSearchParams,
            keyword: e.target.value,
        }
        dispatch(update_admin_search_header_params(header_params))

    };

    const onKeywordSearch = async () => {
        const keyword = adminSearchParams.keyword;
        const header_params = {
            ...empty_header_params,
            category_id: adminSearchParams.category_id,
            keyword,
        }
        await refreshPage(header_params, true)

    };


    const onPriceLowChange = (price_low: number) => {
        const header_params = {
            ...adminSearchParams,
            price_low,
        }
        dispatch(update_admin_search_header_params(header_params))

    };

    const onPriceHighChange = (price_high: number) => {
        const header_params = {
            ...adminSearchParams,
            price_high,
        }
        dispatch(update_admin_search_header_params(header_params))
    };

    const onSortTypeChange = (sort_type: number) => {
        const header_params = {
            ...adminSearchParams,
            sort_type,
        }
        dispatch(update_admin_search_header_params(header_params))
    };


    const onApplyFilter = async () => {
        await refreshPage(adminSearchParams, false)

    };

    const refreshPage = async (header_params: AdminSearchParam, ifRenderHeaderParam: boolean) => {
        const cid: number = header_params.category_id as number
        const search_params = {
            ...header_params,
            page: 1,
            category_id: getAllLeafOfSpecificNode(cid, categoryTree)
        }
        const raw = await getGoods(search_params)
        const resp: Resp = raw.data
        if (resp.code === 0){
            const goodsInfo = resp.data as GoodsInfoBySearch
            const {goods_list, goods_total} = goodsInfo
            if (ifRenderHeaderParam){
                dispatch(update_admin_search_header_params(header_params));
            }
            dispatch(update_admin_goods_data(goods_list));
            dispatch(update_admin_pagination_params({page: 1, total: goods_total}));
        }
    };

    const changeVisible = (visible: boolean) => {
        setShowAddGoodsPanel(visible)
    };

    return {dispatch, adminSearchParams, categoryTree, showAddGoodsPanel, changeVisible, onApplyFilter,
        onCategoryChange, onPriceLowChange, onPriceHighChange, onSortTypeChange, onKeywordChange, onKeywordSearch, onAddGoods}


}


function AdminSearchHeaderUI() {

    const {dispatch, adminSearchParams, categoryTree, showAddGoodsPanel, changeVisible, onApplyFilter,
        onCategoryChange, onPriceLowChange, onPriceHighChange, onSortTypeChange, onKeywordChange, onKeywordSearch, onAddGoods} = AdminSearchHeader()



    return (
        <div>
                <Space direction="vertical">
                    <Space size={250}>
                        <TreeSelect
                            style={{width: 200}}
                            value={adminSearchParams.category_id as number}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            placeholder="Please select"
                            allowClear
                            onChange={onCategoryChange}
                        >
                            {renderTreeNode(categoryTree, false)}
                        </TreeSelect>
                        <Space>
                            <Input placeholder="input goods name" value={adminSearchParams.keyword} style={{width: 200}}
                                   onChange={onKeywordChange}/>
                            <Button type="primary" shape="circle" icon={<SearchOutlined/>}
                                    onClick={onKeywordSearch}/>
                        </Space>
                        <Button type="primary" shape="round" icon={<PlusOutlined/>} size="large"
                                onClick={onAddGoods}>
                            ADD GOODS
                        </Button>
                        <AdminAddGoodsPanel visible={showAddGoodsPanel} changeVisible={changeVisible}/>
                    </Space>
                    <Space size={100}>
                        <InputNumber prefix="$" placeholder="low bound" onChange={onPriceLowChange}
                                     style={{width: 120}} value={adminSearchParams.price_low} min={0} max={10000}/>
                        <InputNumber prefix="$" placeholder="high bound" onChange={onPriceHighChange}
                                     style={{width: 120}} value={adminSearchParams.price_high} min={0} max={10000}/>
                        <Select value={adminSearchParams.sort_type} bordered={true} onSelect={onSortTypeChange} style={{width: 200}}>
                            <Option key={0} value={0}>select sort type</Option>
                            <Option key={1} value={1}>price from low to high</Option>
                            <Option key={2} value={2}>price from high to low</Option>
                            <Option key={3} value={3}>sales from low to high</Option>
                            <Option key={4} value={4}>sales from high to low</Option>
                        </Select>
                        <Button onClick={onApplyFilter}>apply filter</Button>
                    </Space>
                </Space>
        </div>
    );
}

export default AdminSearchHeaderUI;