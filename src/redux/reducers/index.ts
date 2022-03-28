import {combineReducers} from 'redux'
import category_tree_reducer from "./cateogry_tree";
import admin_goods_data_reducer from "./admin_goods_data";
import admin_search_header_params_reducer from "./admin_search_params";
import admin_pagination_params_reducer from "./admin_pagination_params";
import search_params_reducer from "./search_params";
import search_brands_reducer from "./search_brands";
import search_results_reducer from "./search_results";



export const rootReducer =  combineReducers({
    admin_goods_data: admin_goods_data_reducer,
    admin_pagination_params: admin_pagination_params_reducer,
    admin_search_header_params: admin_search_header_params_reducer,
    category_tree: category_tree_reducer,
    search_params: search_params_reducer,
    search_brands: search_brands_reducer,
    search_results: search_results_reducer,
})


export type RootState = ReturnType<typeof rootReducer>