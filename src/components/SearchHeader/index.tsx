import React, {useEffect, useState} from "react";

import {Button, Cascader, Input, Menu, Row, Col, InputRef} from "antd";
import {BulbOutlined} from "@ant-design/icons";
import {getCategoryTree, getGoods} from "../../net";
import {GoodsInfoBySearch, Resp} from "../../net/resp";
import {RootState} from "../../redux/reducers";
import {CategoryNode, getAllLeafOfSpecificNode} from "../../utils/utils";
import {AdminSearchParam} from "../../net/reqParam";
import {update_search_params} from "../../redux/actions/search_params";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {update_search_brands} from "../../redux/actions/search_brands";
import {update_search_results} from "../../redux/actions/search_results";
import {useNavigate} from 'react-router-dom';
import UserIcon from "../UserIcon";

const empty_search_params: AdminSearchParam = {
    category_id: [],
    keyword: '',
    brands: [],
    price_low: 0,
    price_high: 0,
    sort_type: 0,
    page: 1

}

export function parseCategoryTree(tree:any) {
    for(let i = 0; i < tree.length; i++){
        tree[i]["value"] = tree[i].id
        tree[i]["label"] = tree[i].name
        if(tree[i].hasOwnProperty("children") && tree[i].children.length > 0){
            parseCategoryTree(tree[i].children)
        }
    }
    return tree
}

export async function onQuery(params: AdminSearchParam) {
    const raw = await getGoods(params)
    const resp: Resp = raw.data
    if (resp.code === 0) {
        return resp.data as GoodsInfoBySearch
    }
}

export function SearchHeader() {
    const [category_tree, setCategoryTree] = useState<CategoryNode[]>([])
    const [keyword, setKeyword] = useState<string>("")
    const dispatch = useDispatch()
    const cur_search_param = useSelector((state: RootState) => {
        return state.search_params
    }, shallowEqual)
    let navigate = useNavigate();

    useEffect( () => {
        (async function loadCategoryTree() {
            const raw = await getCategoryTree()
            const resp = raw.data
            if (resp.code === 0) {
                const tree = resp.data as CategoryNode[]
                setCategoryTree(parseCategoryTree(tree))
            }
        })();
    }, [])

    const ChangeBrandsAndResults = (goodsInfo: GoodsInfoBySearch | undefined) => {
        if (typeof goodsInfo === 'undefined') return
        dispatch(update_search_results(goodsInfo.goods_list))
        dispatch(update_search_brands(goodsInfo.brand_list))
    }

    const onChangeCategory = (value: any) => {
        if (typeof (value) !== 'undefined'){
            const category_list: number[] = value as number[]
            const category_id: number = category_list[category_list.length - 1]
            const search_param = {
                ...empty_search_params,
                category_id: getAllLeafOfSpecificNode(category_id, category_tree)
            }
            dispatch(update_search_params(search_param))
            setKeyword("")
            onQuery(search_param).then(r => {
                ChangeBrandsAndResults(r)
                navigate("/goods")
            })
        }
        else{
            dispatch(update_search_params(empty_search_params))
        }
    }

    const onChangeKeyword = () => {
        const search_param = {
            ...empty_search_params,
            category_id: cur_search_param.category_id,
            keyword: keyword
        }
        dispatch(update_search_params(search_param))
        onQuery(search_param).then(r => {
            ChangeBrandsAndResults(r)
            navigate("/goods")
        })
    }

    return { category_tree, setCategoryTree, onChangeCategory, keyword, setKeyword, onChangeKeyword }
}

export default function SearchHeaderUI() {

    let navigate = useNavigate();
    const { category_tree, onChangeCategory, keyword, setKeyword, onChangeKeyword } = SearchHeader();

    return (
        <div className="logo">
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="header1">FreshOnline<BulbOutlined/></Menu.Item>
                <Menu.Item key="header6" onClick={()=>navigate("/")}>Home</Menu.Item>
                <Menu.Item key="header2">
                    <Cascader options={category_tree}
                              onChange={onChangeCategory}
                              changeOnSelect={true}
                              expandTrigger={"hover"}
                              placeholder="Please select" />
                </Menu.Item>
                <Menu.Item key="header3">
                    <Input key="SearchInput" placeholder="meat"  style={{ width: '70%' }}
                           value={keyword} onPressEnter={onChangeKeyword}
                           onChange={(e) => {setKeyword(e.target.value)}}
                    />
                    <Button type="primary" onClick={onChangeKeyword}>Submit</Button>
                </Menu.Item>
                <Menu.Item key="header5"style={{width:100, textAlign:"center"}} onClick={()=>navigate("/cart")}>Cart</Menu.Item>
                <Menu.Item key="header4"><UserIcon/></Menu.Item>
            </Menu>
        </div>
    );
}