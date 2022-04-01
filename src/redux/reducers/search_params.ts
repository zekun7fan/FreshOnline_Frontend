import {AdminSearchParam} from "../../net/reqParam";
import {UPDATE_SEARCH_PARAMS} from "../action-types";

const initState: AdminSearchParam= {
    category_id: [],
    keyword: '',
    brands: [],
    price_low: 0,
    price_high: 0,
    sort_type: 0,
    page: 1
}


interface Action {
    type: string,
    data: AdminSearchParam
}

export default function search_params_reducer(preState=initState, action:Action) {
    const {type,data} = action
    switch (type) {
        case UPDATE_SEARCH_PARAMS:
            return data
        default:
            return preState
    }
}