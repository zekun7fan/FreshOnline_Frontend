import {UPDATE_SEARCH_RESULTS} from "../action-types";
import {Goods} from "../../net/reqBody";

export const update_search_results = (data: Goods[]) => ({type:UPDATE_SEARCH_RESULTS, data})