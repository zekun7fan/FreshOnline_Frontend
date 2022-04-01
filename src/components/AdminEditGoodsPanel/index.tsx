import React, {useEffect, useRef, useState} from 'react';
import {Goods} from "../../net/reqBody";
import {Button, Form, FormInstance, Input, InputNumber, message, Modal, Rate, Select, TreeSelect} from "antd";
import {CategoryNode, renderTreeNode} from "../../utils/utils";
import {addGoods, getCategoryTree, updateGoods} from "../../net";
import {Resp} from "../../net/resp";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {goods} from "../../net/url";



const {Option} = Select


const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

interface AdminEditGoodsPanelProps {
    goods: Goods,
    visible: boolean
    changeVisible: Function
}


function AdminEditGoodsPanel(props: AdminEditGoodsPanelProps) {


    const categoryTree = useSelector((state: RootState) => {
        return state.category_tree;
    }, shallowEqual)

    const ref = useRef<FormInstance>(null)

    const cancel = () => {
        props.changeVisible(false)
    };



    const submit = async (goods: Goods) => {
        if (goods.onsale == 0 && goods.salePrice !== undefined){
            message.warn("do not input sale price for this goods when onsale is inactive")
            return;
        }
        if (goods.onsale == 1 && goods.salePrice === undefined){
            message.warn("please input sale price for this goods when onsale is active")
            return;
        }
        if (goods.onsale == 1 && goods.salePrice !== undefined && goods.salePrice >= goods.price){
            message.warn("sale price can not be greater than original price")
            return;
        }
        const raw = await updateGoods(goods)
        const resp: Resp = raw.data
        message.info(resp.msg)
        if (resp.code === 0){
            ref.current?.resetFields()
        }
    };




    return (
        <div>
                <Modal
                    title={"EDIT GOODS"}
                    visible={props.visible}
                    footer={[null, null]}
                    onCancel={cancel}
                >
                    <Form
                        name="goods"
                        onFinish={submit}
                        ref={ref}
                    >
                            <Form.Item
                                name="id"
                                label="Id"
                                initialValue={props.goods.id}
                            >
                                <Input readOnly={true}/>
                            </Form.Item>

                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={props.goods.name}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={props.goods.type}
                        >
                            <Select>
                                <Option value={0}>By quantity</Option>
                                <Option value={1}>By weight</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={"price"}
                            label="Price"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={props.goods.price}
                        >
                            <InputNumber
                                min="0"
                                max="10000"
                                step="0.01"
                                stringMode
                            />
                        </Form.Item>
                        <Form.Item
                            name="storage"
                            label="Storage"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={props.goods.storage}
                        >
                            <InputNumber
                                min="0"
                                max="10000"
                                step="0.01"
                                stringMode
                            />
                        </Form.Item>
                         <Form.Item
                            name="sales"
                            label="Sales"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={props.goods.sales}
                        >
                            <InputNumber
                                min="0"
                                max="10000"
                                step="0.01"
                                stringMode
                                readOnly={true}
                            />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            initialValue={props.goods.description}
                        >
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item
                            name="onsale"
                            label="Onsale"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={props.goods.onsale}
                        >
                            <Select>
                                <Option value={0}>not onsale</Option>
                                <Option value={1}>onsale</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="salePrice"
                            label="Sale price"
                            initialValue={props.goods.salePrice}
                        >
                            <InputNumber
                                min="0"
                                max="10000"
                                step="0.01"
                                stringMode
                            />
                        </Form.Item>
                         <Form.Item
                            name="rate"
                            label="Rate"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={props.goods.rate}
                        >
                            <Rate allowHalf disabled={true}/>
                        </Form.Item>
                         <Form.Item
                            name="rateCount"
                            label="Rate count"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={props.goods.rateCount}
                        >
                            <Input readOnly={true}/>
                        </Form.Item>
                        <Form.Item
                            name="brand"
                            label="Brand"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={props.goods.brand}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="categoryId"
                            label="Category"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={props.goods.categoryId}
                        >
                            <TreeSelect
                                showSearch
                                style={{width: '100%'}}
                                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                placeholder="Please select"
                                allowClear
                            >
                                {renderTreeNode(categoryTree, true)}
                            </TreeSelect>
                        </Form.Item>
                        <Form.Item
                            name="isNew"
                            label="Isnew"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={props.goods.isNew}
                        >
                            <Select>
                                <Option value={0}>not new</Option>
                                <Option value={1}>new</Option>
                            </Select>
                        </Form.Item>

                        {/*<Form.Item*/}
                        {/*    name="pic"*/}
                        {/*    label="Pictures"*/}
                        {/*    rules={[*/}
                        {/*        {*/}
                        {/*            required: false,*/}
                        {/*        },*/}
                        {/*    ]}*/}
                        {/*    getValueFromEvent={this.getPictures}*/}
                        {/*>*/}
                        {/*    <GoodsPicWall goodsId={goods_id} urlList={urlList}/>*/}
                        {/*</Form.Item>*/}


                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
        </div>
    );
}

export default AdminEditGoodsPanel;