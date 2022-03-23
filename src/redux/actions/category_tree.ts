import {UPDATE_CATEGORY_TREE} from "../action-types";
import {CategoryNode} from "../../utils/utils";

export const update_category = (data: CategoryNode[]) => ({type: UPDATE_CATEGORY_TREE, data})