import React, {useEffect, useRef, useState} from 'react';
import {Goods} from "../../net/reqBody";
import {Button, Form, FormInstance, Input, InputNumber, message, Modal, Rate, Select, TreeSelect} from "antd";
import {CategoryNode, renderTreeNode} from "../../utils/utils";
import {addGoods, getCategoryTree, updateGoods} from "../../net";
import {Resp} from "../../net/resp";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";



const {Option} = Select


const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

interface AdminEditGoodsPanelProps {
    goods: Goods,
    visible: boolean
}


function AdminEditGoodsPanel(props: AdminEditGoodsPanelProps) {

    const [visible, setVisible] = useState<boolean>(props.visible)
    const categoryTree = useSelector((state: RootState) => {
        return state.category_tree;
    }, shallowEqual)

    const ref = useRef<FormInstance>(null)

    const cancel = () => {
        setVisible(false)
    };



    const submit = async (goods: Goods) => {
        if (goods.sale_price != undefined && goods.sale_price >= goods.price){
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
                    visible={visible}
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
                            name="sales"
                            label="Sales"
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
                                readOnly={true}
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
                                <Option value={0}>not onsale</Option>
                                <Option value={1}>onsale</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="sale_price"
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
                            name="rate"
                            label="Rate"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Rate allowHalf disabled={true}/>
                        </Form.Item>
                         <Form.Item
                            name="rate_count"
                            label="Rate count"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
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
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="category_id"
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
                            name="is_new"
                            label="Isnew"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
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