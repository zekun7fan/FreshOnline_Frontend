import {UPDATE_CATEGORY_TREE} from "../action-types";
import {CategoryNode} from "../../utils/utils";
import {getCategoryTree} from "../../net";
import {Resp} from "../../net/resp";


interface Action {
    type: string,
    data: CategoryNode[]
}


let initState: CategoryNode[] = []

const queryCategoryTree = async () => {
    const raw = await getCategoryTree()
    const resp: Resp = raw.data
    if (resp.code === 0){
        initState = resp.data as CategoryNode[];
    }
};

queryCategoryTree().catch();



export default function category_tree_reducer(preState=initState,action: Action){
    const {type,data} = action
    switch (type) {
        case UPDATE_CATEGORY_TREE:
            return data
        default:
            return preState
    }
}