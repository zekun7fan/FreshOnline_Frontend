import {Resp, RespContent} from "./resp";


export interface ReqBody {

}

export interface Goods extends ReqBody, RespContent{
    id?: number,
    name: string,
    type: number,
    price: number,
    storage: number,
    sales?: number,
    description?: string,
    onsale: number,
    salePrice?: number,
    rate?: number,
    rateCount?: number,
    brand: string,
    categoryId: number,
    isNew: number,
    pic: string
}


export interface PaymentMethod extends ReqBody{
    id? : number,
    userId: number,
    paymentType: number,
    details: string
}

export interface Details extends ReqBody {
    cardNumber: number,
    cvvCode: number
}

export interface User extends ReqBody{
    id?: number,
    name?: string,
    password?: string,
    email?: string,
    type?: number,
    localtion?: string
}

export interface Category extends ReqBody{
    id?: number,
    parentId: number,
    name: string,
    level: number

}