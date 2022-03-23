

import {UPDATE_ADMIN_LIST_DATA} from "../action-types";
import {Goods} from "../../net/reqBody";


interface Action {
    type: string,
    data: Goods[]

}

const initState: Goods[] = []
export default function admin_goods_data_reducer(preState=initState,action: Action){
    const {type,data} = action
    switch (type) {
        case UPDATE_ADMIN_LIST_DATA: //如果是加
            return [...data]
        default:
            return preState
    }
}