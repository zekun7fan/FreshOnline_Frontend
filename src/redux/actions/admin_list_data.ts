import {UPDATE_ADMIN_LIST_DATA} from "../action-types";
import {Goods} from "../../net/reqBody";

export const update_admin_goods_data = (data: Goods[]) => ({type: UPDATE_ADMIN_LIST_DATA, data})