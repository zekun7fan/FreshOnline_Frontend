import {Button, Form, FormInstance, Input, InputNumber, message, Modal, Select, TreeSelect} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {Goods} from "../../net/reqBody";
import {CategoryNode, renderTreeNode} from "../../utils/utils";
import {addGoods, getCategoryTree} from "../../net";
import {Resp} from "../../net/resp";
import {useSelector, shallowEqual} from "react-redux";
import {RootState} from "../../redux/reducers";



interface AdminAddGoodsPanelProps {
    visible: boolean,
    changeVisible: Function
}

const {Option} = Select

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};


function AdminAddGoodsPanel(props: AdminAddGoodsPanelProps) {

    console.log("fcc")

    const categoryTree = useSelector((state: RootState) => {
        return state.category_tree;
    }, shallowEqual)

    const ref = useRef<FormInstance>(null);

    const cancel = () => {
        ref.current?.resetFields()
        props.changeVisible(false)
    };

    const submit = async (goods: Goods) => {
        if (goods.salePrice != undefined && goods.salePrice >= goods.price){
            message.warn("sale price can not be greater than original price")
            return;
        }
        const raw = await addGoods(goods)
        const resp: Resp = raw.data
        message.info(resp.msg)
        if (resp.code === 0){
            ref.current?.resetFields()
        }
    };


    return (
            <div>
                <Modal
                    title={"ADD GOODS"}
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
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
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
                        >
                            <Select>
                                <Option value={"0"}>By quantity</Option>
                                <Option value={"1"}>By weight</Option>
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
                        >
                            <InputNumber
                                min="0"
                                max="10000"
                                step="0.01"
                                stringMode
                            />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description">
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
                        >
                            <Select>
                                <Option value={"0"}>not onsale</Option>
                                <Option value={"1"}>onsale</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="salePrice"
                            label="Sale price"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber
                                min="0"
                                max="10000"
                                step="0.01"
                                stringMode
                            />
                        </Form.Item>
                        <Form.Item
                            name="brand"
                            label="Brand"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
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
                        >
                            <Select>
                                <Option value={"0"}>not new</Option>
                                <Option value={"1"}>new</Option>
                            </Select>
                        </Form.Item>


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


export default AdminAddGoodsPanel;