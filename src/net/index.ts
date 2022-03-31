import {del, get, post, put} from "./http";
import {
    category,
    categoryTree,
    goods,
    goodsById,
    loginUrl, logoutUrl,
    paymentMethodByPid,
    paymentMethodByUserId,
    paymentMethodUrl, registerUrl
} from "./url";
import {AdminSearchParam} from "./reqParam";
import {Category, Goods, PaymentMethod, User} from "./reqBody";
import {CategoryNode} from "../utils/utils";


export function getCategoryTree() {
    return get(categoryTree);
}

export function getGoodsById(id: number) {
    return get(goodsById(id));
}

export function getGoods(params: AdminSearchParam) {
    return get(goods, params);
}

export function updateGoods(data: Goods) {
    return put(goods, {}, data)
}

export function addGoods(data: Goods) {
    return post(goods, {}, data)
}

export function deleteGoods(id: number) {
    return del(goodsById(id));
}


export function getPaymentMethodByUserId(id: number) {
    return get(paymentMethodByUserId(id))
}

export function addPaymentMethod(paymentMethod: PaymentMethod) {
    return post(paymentMethodUrl, {}, paymentMethod)

}

export function delPaymentMethodByPid(id: number) {
    return del(paymentMethodByPid(id))
}

export function login(user: User) {
    return put(loginUrl, {}, user)
}

export function register(user: User) {
    return post(registerUrl, {}, user)
}

export function delCategory(node: CategoryNode){
    return del(category, {}, node)
}

export function addCategory(node: Category) {
    return post(category, {}, node)
}

export function logout(user: User){
    return put(logoutUrl, {}, user)
}

export function updatePass(userId?:number, old_pass?:string, new_pass?:string) {
    return get('/user/update_password', { 'user_id': userId, "old_pass": old_pass, "new_pass": new_pass })
}
export function updateAddress(userId?:number, address?:string) {
    return get('/user/update_address', { 'user_id': userId, "address": address })
}

export function queryOrderByUser(userId?:number, startPo?:number) {
    return get('/user/orders', { 'user_id': userId, 'position': startPo })
}

export function queryWeeklySpecial() {
    return get('/weekly_special', {})
}

export function queryCategoryGoods(idList?:Array<number>|number) {
    return get('/random_goods', { 'catogory_id_list': idList })
}

export function queryUser(userId?:number) {
    return get('/user', { 'user_id': userId })
}