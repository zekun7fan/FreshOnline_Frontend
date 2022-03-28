import {UPDATE_SEARCH_PARAMS} from "../action-types";
import {AdminSearchParam} from "../../net/reqParam";

export const update_search_params = (data: AdminSearchParam) => ({type: UPDATE_SEARCH_PARAMS, data})