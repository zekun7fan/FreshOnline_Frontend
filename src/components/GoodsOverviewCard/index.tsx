import React, { Component, useState } from 'react';
import { Rate, Card, Button } from 'antd';
import index from './index.module.css';
import { useNavigate } from 'react-router-dom';
import {getUserId} from "../../utils/user";
import {addToCart, removeFromCart} from "../../net";
// sample usage <GoodsOverviewCard id={1} in_cart={0} name="统华小厨片皮鸭(全只)组合套餐" rate={4.5} rate_count={20} price={20.99} onsale={false} type={1} pic="https://www.tntsupermarket.com/media/catalog/product/cache/1b10eb595fa02731ea0609dbbcedd549/5/0/50959201.jpg" show_button={true}/>
export interface OverviewCardProps {
    key?: number,
    id: number,
    name: string,
    rate: number,
    rate_count: number,
    price: number,
    onsale: boolean,
    sale_price?: number,
    type: number,
    pic: string,
    show_button: boolean,
    in_cart: number
}

function GoodsOverviewCard(props: OverviewCardProps) {

    const [in_cart, set_in_cart] = useState<number>(props.in_cart);
    let navigate = useNavigate();



    const addToCartHandler = async () => {
        const user_id = getUserId()
            if(user_id == null) return
        try {
            let response = await addToCart(user_id, props.id, 1)
            if (response.data.code != 0) {
                console.log(response.data.code)
                console.log(response.data.msg)
                return
            }
            set_in_cart(1)
        }
        catch (e) {
            console.log(e)
        }
    }

    const removeFromCartHandler = async () => {
        const user_id = getUserId()
            if(user_id == null) return
        try {
            let response = await removeFromCart(user_id, props.id)
            if (response.data.code != 0) {
                console.log(response.data.code)
                console.log(response.data.msg)
                return
            }
            set_in_cart(0);
        }
        catch (e) {
            console.log(e)
        }

    }

    const redirectGoodsDetails = () => {
        
        navigate("/goods/" + props.id);
    }





    let image = props.pic.split(",")[0];
    let cartinfo = "selected: ";
    let price = props.onsale && props.sale_price? props.sale_price : props.price;
    let price_total = in_cart * price;
    cartinfo += props.type == 1 ? in_cart.toFixed(2) + "/lb" : in_cart.toFixed(0);
    cartinfo += "   total: $" + price_total.toFixed(2);

    let card_height = 420;
    let button_display = in_cart ? <div>{cartinfo}<Button className={index.button} onClick={removeFromCartHandler}> Remove From Cart </Button></div> : <Button onClick={addToCartHandler} className={index.button}> add To Cart </Button>
    if (!props.show_button) {
        button_display = <></>;
        card_height = 370
    }
    return (

        <Card
            hoverable
            style={{ width: 240, height: card_height, display: "inline-block", margin: 5, borderRadius: 10, overflow: "hidden" }}
            cover={<img alt={props.name} src={image} onClick={redirectGoodsDetails} />}
        >
            <div className={index.meta} onClick={redirectGoodsDetails}> <strong>{props.name}</strong></div>
            <Rate className={index.rate} allowHalf={true} disabled={true} defaultValue={0} value={props.rate} />
            &nbsp;&nbsp;({props.rate_count})
            {props.onsale ?
                <div>
                    <span className={index.onsale_price}>${props.sale_price}{props.type == 1 ? "/lb" : ""}&nbsp;</span>
                    <span className={index.original_price}>${props.price}</span>
                </div>
                : <div>
                    <span className={index.price}>${props.price}{props.type == 1 ? "/lb" : ""}</span>
                </div>
            }
            {button_display}


        </Card>

    );

}

export default GoodsOverviewCard;