/* tslint:disable */
// Generated using typescript-generator version 2.9.456 on 2022-03-28 19:50:50.

export interface StockedGoods extends Serializable {
    id?: number;
    name?: string;
    type?: number;
    price?: number;
    storage?: number;
    sales?: number;
    onsale?: number;
    salePrice?: number;
    rate?: number;
    rateCount?: number;
    brand?: string;
    categoryId?: number;
    isNew?: number;
    pic?: string;
    active?: boolean;
    description?: string;
}

export interface User {
    id?: number;
    name?: string;
    password?: string;
    email?: string;
    type?: number;
    location?: string;
}

export interface Order {
    orderId?: number;
    userId?: number;
    paymentMethodId?: number;
    orderTime?: Date;
    payTime?: Date;
    finishTime?: Date;
    status?: number;
    location?: string;
}

export interface SaledGoods {
    orderId?: number;
    goodsId?: number;
    price?: number;
    count?: number;
    rate?: number;
    comment?: string;
}

export interface Category extends Serializable {
    id?: number;
    parentId?: number;
    name?: string;
    level?: number;
}

export interface OrderDetail extends Order {
    goodsList?: SaledGoodsDetail[];
}

export interface SaledGoodsDetail extends SaledGoods {
    name?: string;
    pic?: string;
}

export interface Serializable {
}
