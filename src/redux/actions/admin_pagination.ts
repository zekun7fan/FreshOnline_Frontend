import {UPDATE_ADMIN_PAGINATION} from "../action-types";
import {PaginationParams} from "../reducers/admin_pagination_params";

export const update_admin_pagination_params = (data: PaginationParams) => ({type: UPDATE_ADMIN_PAGINATION, data})