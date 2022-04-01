import {UPDATE_CATEGORY_TREE} from "../action-types";
import {CategoryNode} from "../../utils/utils";


interface Action {
    type: string,
    data: CategoryNode[]
}


let initState: CategoryNode[] = []

export default function category_tree_reducer(preState=initState,action: Action){
    const {type,data} = action
    switch (type) {
        case UPDATE_CATEGORY_TREE:
            return data
        default:
            return preState
    }
}