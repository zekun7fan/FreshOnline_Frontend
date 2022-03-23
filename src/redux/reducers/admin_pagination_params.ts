import {UPDATE_ADMIN_PAGINATION} from "../action-types";


const initState : PaginationParams = {
    page: 1,
    total: 1,
}



export interface PaginationParams {
    page: number,
    total: number
}

interface Action {
    type: string,
    data: PaginationParams
}
export default function admin_pagination_params_reducer(preState=initState,action: Action){
    const {type,data} = action
    switch (type) {
        case UPDATE_ADMIN_PAGINATION: //如果是加
            return {...preState, ...data}
        default:
            return preState
    }
}