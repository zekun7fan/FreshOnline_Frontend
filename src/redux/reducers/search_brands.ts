import {UPDATE_SEARCH_BRANDS} from "../action-types";

const initState:string[] = []

interface Action {
    type: string,
    data: string[]
}

export default function search_brands_reducer(preState=initState, action: Action){
    const {type,data} = action
    switch (type) {
        case UPDATE_SEARCH_BRANDS:
            return data
        default:
            return preState
    }
}