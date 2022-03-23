import {combineReducers} from 'redux'
import category_tree_reducer from "./cateogry_tree";
import admin_goods_data_reducer from "./admin_goods_data";
import admin_search_header_params_reducer from "./admin_search_params";
import admin_pagination_params_reducer from "./admin_pagination_params";



export const rootReducer =  combineReducers({
    admin_goods_data: admin_goods_data_reducer,
    admin_pagination_params: admin_pagination_params_reducer,
    admin_search_header_params: admin_search_header_params_reducer,
    category_tree: category_tree_reducer,
})


export type RootState = ReturnType<typeof rootReducer>