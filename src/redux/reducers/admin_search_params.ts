import {UPDATE_ADMIN_SEARCH_HEADER_PARAMS} from "../action-types";
import {AdminSearchParam} from "../../net/reqParam";


const initState: AdminSearchParam= {
    category_id: 0,
    keyword: '',
    brands: [],
    price_low: -1,
    price_high: -1,
    sort_type: 0,
    page: 1
}


interface Action {
    type: string,
    data: AdminSearchParam

}
export default function admin_search_header_params_reducer(preState=initState,action: Action){
    const {type,data} = action
    switch (type) {
        case UPDATE_ADMIN_SEARCH_HEADER_PARAMS:
            return {...preState, ...data}
        default:
            return preState
    }
}