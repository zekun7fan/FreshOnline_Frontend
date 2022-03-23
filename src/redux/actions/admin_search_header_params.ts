import {UPDATE_ADMIN_SEARCH_HEADER_PARAMS} from "../action-types";
import {AdminSearchParam} from "../../net/reqParam";


export const update_admin_search_header_params = (data: AdminSearchParam) => ({type: UPDATE_ADMIN_SEARCH_HEADER_PARAMS, data})