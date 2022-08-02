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
    , cartUrl, goodsDetailsUrl, favoriteUrl, goodsPictureUrl, saledGoodsUrl,
} from "./url";
import {AdminSearchParam} from "./reqParam";
import {Category, Goods, PaymentMethod, User} from "./reqBody";
import {CategoryNode} from "../utils/utils";
import {Order, SaledGoods, SaledGoodsDetail} from "../utils/javamodel";
import {GoodsPicInfo} from "./resp";


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

export function checkOut(user_id: number, location:string) {
    return post("/checkout",{},{id:user_id, location:location});
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

export function updatePwd(user: User) {
    return put('/user/update_password', {}, user)
}


export function updateAddress(user: User) {
    return put('/user/update_address', { }, user)
}

export function queryOrderByUser(userId?:number, startPo?:number) {
    return get('/user/orders', { 'user_id': userId, 'position': startPo })
}

export function queryWeeklySpecial() {
    return get('/weekly_special', {})
}

export function queryCategoryGoods(idList?:Array<number>|number) {
    return get('/random_goods', { 'category_id_list': idList })
}

export function queryUser(userId?:number) {
    return get('/user', { 'user_id': userId })
}



export function getCartEntry(userId :number, goodsId: number) {
    return get(cartUrl + "_element", { 'user_id': userId, 'goods_id': goodsId })
}

export function updateToCart(userId :number, goodsId:number, count:number = 1) {
    return post(cartUrl, {}, { userId: userId, goodsId: goodsId, count: count })
}

export function addToCart(userId :number, goodsId:number, count:number = 1) {
    return put(cartUrl, {}, { userId: userId, goodsId: goodsId, count: count })
}

export function removeFromCart(userId :number, goodsId: number) {
    return del(cartUrl, {}, { userId: userId, goodsId: goodsId })
}


export function getCartGoods(userId :number) {
    return get(cartUrl, { 'user_id': userId })
}

export function getGoodsDetails(goodsId:number) {
    return get(goodsDetailsUrl + "/" + goodsId)
}
export function getFavEntry(userId :number, goodsId: number) {
    return get(favoriteUrl, { 'user_id': userId, 'goods_id': goodsId })
}


export function addToFav(userId :number, goodsId: number) {
    return put(favoriteUrl, {}, { userId: userId, goodsId: goodsId })
}

export function removeFromFav(userId :number, goodsId: number) {
    return del(favoriteUrl, {}, { userId: userId, goodsId: goodsId })
}

export function payOrder(order:Order) {
    return post("/payOrder", {}, order)
}
export function cancelOrder(order:Order) {
    return post("/cancelOrder", {}, order)
}
export function deleteGoodsPicture(id: number, info: GoodsPicInfo) {
    return del(goodsPictureUrl(id), {}, info)
}


export function updateSaledGoods(goods: SaledGoods) {
    return put(saledGoodsUrl, {}, goods)
}

export function getFeedBack(goodsId: number) {
    return get(saledGoodsUrl, {'goodsId': goodsId})
}
