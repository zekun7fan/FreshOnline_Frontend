


interface ReqBody {

}

interface Goods extends ReqBody{
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