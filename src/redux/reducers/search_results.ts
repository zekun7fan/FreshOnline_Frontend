import {UPDATE_SEARCH_RESULTS} from "../action-types";
import {Goods} from "../../net/reqBody";


interface Action {
    type: string,
    data: Goods[]

}

const initState: Goods[] = []

export default function search_results_reducer (preState=initState,action: Action) {
    const {type,data} = action
    switch (type) {
        case UPDATE_SEARCH_RESULTS:
            return data
        default:
            return preState
    }
}