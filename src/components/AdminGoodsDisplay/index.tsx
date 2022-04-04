import React from 'react';
import PropTypes from 'prop-types';
import {Empty, List, message, Pagination} from "antd";
import AdminGoodsOverviewCard from "../AdminGoodsOverviewCard";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {Goods} from "../../net/reqBody";
import {update_admin_goods_data} from "../../redux/actions/admin_list_data";
import {update_admin_pagination_params} from "../../redux/actions/admin_pagination";
import {AdminSearchParam} from "../../net/reqParam";
import {deleteGoods, getGoods} from "../../net";
import {GoodsInfoBySearch, Resp} from "../../net/resp";



function AdminGoodsDisplay() {

    const dispatch = useDispatch();

    const deleteItem = async (id: number) => {
        const raw = await deleteGoods(id)
        const resp: Resp = raw.data
        if (resp.code === 0){
            const newGoodsData = adminGoodsData.filter((item: Goods) => {
                return item.id !== id;
            })
            dispatch(update_admin_goods_data(newGoodsData))
        }
        message.info(resp.msg)
    };

    const adminGoodsData = useSelector((state: RootState) => {
        return state.admin_goods_data;
    }, shallowEqual)

    const adminPaginationParams = useSelector((state: RootState) => {
        return state.admin_pagination_params;
    }, shallowEqual)

    const adminSearchParams = useSelector((state: RootState) => {
        return state.admin_search_header_params;
    }, shallowEqual)

    const onPaginationChange = async (page: number) => {
        dispatch(update_admin_pagination_params({...adminPaginationParams, page}));
        const searchParams: AdminSearchParam = {...adminSearchParams, page}
        const raw = await getGoods(searchParams)
        const resp : Resp = raw.data
        if (resp.code === 0){
            const {goods_list} = resp.data as GoodsInfoBySearch
            dispatch(update_admin_goods_data(goods_list))
        }
    };

    return {dispatch, deleteItem, deleteGoods, adminSearchParams, adminPaginationParams, adminGoodsData, onPaginationChange}
}


function AdminGoodsDisplayUI() {

    const {dispatch, deleteItem, deleteGoods, adminSearchParams, adminPaginationParams, adminGoodsData, onPaginationChange} = AdminGoodsDisplay()

    return (
        <div>
            {
                adminGoodsData.length === 0 ?
                    <Empty/> :
                    <List
                        grid={{
                            gutter: 20,
                            column: 4,
                        }}
                        dataSource={adminGoodsData}
                        renderItem={(item: Goods) => (
                            <List.Item>
                                <AdminGoodsOverviewCard
                                    goods={item}
                                    deleteItem={deleteItem}
                                 />
                            </List.Item>
                        )}
                    />
            }
            <Pagination
                total={adminPaginationParams.total}
                current={adminPaginationParams.page}
                showQuickJumper={true}
                showSizeChanger={false}
                pageSize={25}
                onChange={onPaginationChange}
                showTotal={total => `Total ${total} items`}
            />
        </div>

    );
}

export default AdminGoodsDisplayUI;