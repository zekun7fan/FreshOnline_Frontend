


export interface ReqBody {

}

export interface Goods extends ReqBody{
    id?: number,
    name: string,
    type: number,
    price: number,
    storage: number,
    sales?: number,
    description?: string,
    onsale: number,
    sale_price?: number,
    rate?: number,
    rate_count?: number,
    brand: string,
    category_id: number,
    is_new: number,
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
    password: string,
    email: string,
    type?: number,
    localtion?: string
}