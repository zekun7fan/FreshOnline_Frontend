import {del, get, post, put} from "./http";
import {
    categoryTree,
    goods,
    goodsById,
    loginUrl,
    paymentMethodByPid,
    paymentMethodByUserId,
    paymentMethodUrl, registerUrl
} from "./url";
import {AdminSearchParam} from "./reqParam";
import {Goods, PaymentMethod, User} from "./reqBody";


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