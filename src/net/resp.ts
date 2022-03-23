import {Goods} from "./reqBody";


export interface Resp {
    code: number,
    msg: string,
    data: RespContent

}

export interface RespContent {

}



export interface GoodsInfoBySearch {
    goods_list: Goods[],
    brand_list: string[],
    price_range: [number, number],
    goods_total: number
}














