import React, {useEffect, useRef, useState} from 'react';
import { Rate, Button, InputNumber, Tabs } from 'antd';
import index from './index.module.css'
import { addToCart, updateToCart, removeFromCart, getGoodsDetails, getCartEntry, getFavEntry, addToFav, removeFromFav } from '../../net';
import { Link } from 'react-router-dom'
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Navigate,  useParams, useNavigate} from 'react-router-dom';
import { Interface } from 'readline';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"

import {getUserId} from "../../utils/user";
import { Category, StockedGoods } from '../../utils/javamodel';

const { TabPane } = Tabs;


interface fetcehedData extends StockedGoods{
    cate1:Category,
    cate2:Category,
    cate3:Category
};




function GoodsDetailsDisplay() {    
    const id : number = parseInt(useParams().goodsId!);
    
    const [get_success,set_get_success] = useState<boolean>(false);
    const [cart_count,set_cart_count] = useState<number>(0);
    const [like, set_like] =useState<boolean>(false);
    const [selected, set_selected] = useState<number>(0);
    // const [redirect, set_redirect] = useState<string>("");
    const [data, set_data] = useState<fetcehedData>();
    let navigate = useNavigate();
    let user_id = getUserId();

    const updateToCartHandler = async () => {
        if (!user_id) {
            navigate("/login");
            return 
        }

        try {
            if (cart_count == 0 && selected != 0) {
                let response = await removeFromCart(user_id, id)
                if (response.data.code != 0) {
                    console.log(response.data.code)
                    console.log(response.data.msg)
                    return
                }
                set_selected(0);
            }
            else if (selected != 0) {
                let response = await updateToCart(user_id, id, cart_count)
                if (response.data.code != 0) {
                    console.log(response.data.code)
                    console.log(response.data.msg)
                    return
                }
                set_selected(cart_count);
            }
            else if (cart_count) {
                let response = await addToCart(user_id, id, cart_count)
                if (response.data.code != 0) {
                    console.log(response.data.code)
                    console.log(response.data.msg)
                    return
                }
                set_selected(cart_count);
            }


        }
        catch (e) {
            console.log(e)
        }
    }




    const fetchData = async () => {
        try {
            
            const response = await getGoodsDetails(id);
            if (response.data.code != 0) {
                console.log(response.data.code)
                return
            }
            set_data(response.data.data);
            if (user_id){
                set_get_success(false);
                fetchUserData();
            }
        } catch (e) {
            console.log(e)
        }

    }

    

    const fetchUserData = async () => {
        let promise1 = getCartEntry(user_id!, id);
        let promise2 = getFavEntry(user_id!, id);
        Promise.all([promise1, promise2])
            .then(
                values => {

                    if (values[0].data.code != 0) {
                        console.log(values[0].data.code);
                        return
                    }
                    if (values[1].data.code != 0) {
                        console.log(values[1].data.code);
                        return
                    }
                    set_like(values[1].data.result)
                    if (values[0].data.data) {
                        
                        set_selected(values[0].data.data.count);
                        set_cart_count(values[0].data.data.count);
                    }
                    set_get_success(true);

                }
            )
    }


    useEffect(() => {
        fetchData();
    }, [])


    const onCountChange = (value : number) => {
        set_cart_count(value);
    }


    const addToFavouriteHandler = async () => {
        if (!user_id) {
            navigate("/login");
            return 
        }
        try {
            const response = await addToFav(user_id, id)
            if (response.data.code != 0) {
                console.log(response.data.code);
                console.log(response.data.msg);
                return
            }
            set_like(true);
        } catch (e) {
            console.log(e)
        }

    }
    
    const removeFromFavouriteHandler = async () => {
        if (!user_id) {
            navigate("/login");
            return 
        }
        try {
            const response = await removeFromFav(user_id, id)
            if (response.data.code != 0) {
                console.log(response.data.code);
                console.log(response.data.msg);
                return
            }
            set_like(false);
        } catch (e) {
            console.log(e)
        }

    }

        // if (redirect) {
        //     return <Navigate to={redirect} />;
        // }
        if (!get_success) {
            return (<div style={{ height: 700 }}></div>)
        }

        if (!data){
            return(<div><h1>Product is not found</h1></div>)
        }


        let images = data!.pic!.split(",").map(url => {
            return { original: url, thumbnail: url, }
        })

        let favourite_icon = like ?
            <HeartFilled onClick={removeFromFavouriteHandler} className={index.favourite_icon} /> :
            <HeartOutlined onClick={addToFavouriteHandler} className={index.unfavourite_icon} />;

        return (
            <div style={{ textAlign: "left" }}>
                <div className={index.cate_navigator}>
                    <h3 className={index.cate_navigator_element}> {data!.cate1.name} </h3><h3 className={index.cate_navigator_element}> &nbsp; &#62; &nbsp; </h3>
                    <h3 className={index.cate_navigator_element}> {data!.cate2.name} </h3> <h3 className={index.cate_navigator_element}> &nbsp; &#62; &nbsp; </h3>
                    <h3 className={index.cate_navigator_element}> {data!.cate3.name} </h3> <h3 className={index.cate_navigator_element}> &nbsp; &#62; &nbsp; </h3>
                    <h3 className={index.cate_navigator_element}> {data!.name} </h3>
                </div>
                <div className={index.carousel_div}>
                    <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} />
                </div>
                <div className={index.info_div}>
                    <h1 style={{ margin: 0 }}>{data!.name}</h1>
                    <Rate allowHalf={true} disabled={true} defaultValue={0} value={data!.rate} />
                    &nbsp;&nbsp;({data!.rateCount})
                    &nbsp;&nbsp; | &nbsp;&nbsp;
                    {data!.type ? " By weight" : " By quantity"}
                    &nbsp;&nbsp; | &nbsp;&nbsp;
                    In stock: {data!.type ? data!.storage + "  Lbs left" : Math.round(data!.storage!) + " left"}
                    {data!.onsale ?
                        <div>
                            <span className={index.onsale_price}>${data!.salePrice}{data!.type == 1 ? "/lb" : ""}&nbsp;</span>
                            <span className={index.original_price}>${data!.price}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;{favourite_icon}
                        </div>
                        : <div>
                            <span className={index.price}>${data!.price}{data!.type == 1 ? "/lb" : ""}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;{favourite_icon}
                        </div>
                    }

                    <h3>Description:</h3>
                    <p>{data!.description}</p>
                    <h4>Quantity: </h4>
                    {data!.type ?
                        <InputNumber size="large" style={{ width: 300, textAlign: "center" }} min={0} value={cart_count} defaultValue={0}
                            formatter={value => { if (!value) { value = 0 } return "In Lbs: " + value; }}
                            parser={value => parseFloat(value!.replace('In Lbs: ', ''))} step={0.5} onChange={onCountChange} /> :
                        <InputNumber size="large" min={0} value={cart_count} defaultValue={0}
                            formatter={value => { if (!value) { value = 0 } return Math.floor(value).toString() }}
                            step={1} onChange={onCountChange} />
                    }
                    <br />
                    <Button onClick={updateToCartHandler} className={index.button}> {selected ? "Update To Cart" : "Add To Cart"} </Button>

                </div>
                <Tabs type="card">
                    <TabPane tab="comments" key="1">
                        Comments goes here
                    </TabPane>
                    <TabPane tab="details" key="2">
                        {data!.description}
                    </TabPane>
                </Tabs>,
            </div>
        );
}

export default GoodsDetailsDisplay;