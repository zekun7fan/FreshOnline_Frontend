
interface ReqParam {

}


interface AdminSearchParam extends ReqParam {
    category_id: Array<number>,
    keyword: string,
    brands: Array<string>,
    price_low: number,
    price_high: number,
    sort_type: number
}