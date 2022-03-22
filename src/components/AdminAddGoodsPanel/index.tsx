import {Button, Form, Input, InputNumber, Modal, Select, TreeSelect} from 'antd';
import React from 'react';
import {Option} from "antd/es/mentions";

interface AdminAddGoodsPanelProps {
    visible: boolean
}



// function AdminAddGoodsPanel({visible}: AdminAddGoodsPanelProps) {
//     return (
//             <div>
//                 <Modal
//                     title={"ADD GOODS"}
//                     visible={visible}
//                     footer={[null, null]}
//                     onCancel={cancel}
//                 >
//                     <Form
//                         name="goods_info"
//                         onFinish={submit}
//                         ref={formRef}
//                     >
//
//                         <Form.Item
//                             name="name"
//                             label="Name"
//                             rules={[
//                                 {
//                                     required: true,
//                                 },
//                             ]}
//                         >
//                             <Input/>
//                         </Form.Item>
//                         <Form.Item
//                             name="type"
//                             label="Type"
//                             rules={[
//                                 {
//                                     required: true,
//                                 },
//                             ]}
//                         >
//                             <Select>
//                                 <Option value={0}>By quantity</Option>
//                                 <Option value={1}>By weight</Option>
//                             </Select>
//                         </Form.Item>
//                         <Form.Item
//                             name={"price"}
//                             label="Price"
//                             rules={[
//                                 {
//                                     required: true,
//                                 },
//                             ]}
//                         >
//                             <InputNumber
//                                 min="0"
//                                 max="100000000"
//                                 step="0.01"
//                                 stringMode
//                             />
//                         </Form.Item>
//                         <Form.Item
//                             name="storage"
//                             label="Storage"
//                             rules={[
//                                 {
//                                     required: true,
//                                 },
//                             ]}
//                         >
//                             <InputNumber
//                                 min="0"
//                                 max="100000000"
//                                 step="0.01"
//                                 stringMode
//                             />
//                         </Form.Item>
//                         <Form.Item
//                             name="description"
//                             label="Description">
//                             <Input.TextArea/>
//                         </Form.Item>
//                         <Form.Item
//                             name="onsale"
//                             label="Onsale"
//                             rules={[
//                                 {
//                                     required: true,
//                                 },
//                             ]}
//                         >
//                             <Select>
//                                 <Option value={0}>not onsale</Option>
//                                 <Option value={1}>onsale</Option>
//                             </Select>
//                         </Form.Item>
//                         <Form.Item
//                             name="sale_price"
//                             label="Sale price"
//                             rules={[
//                                 {
//                                     required: true,
//                                 },
//                             ]}
//                         >
//                             <InputNumber
//                                 min="0"
//                                 max="100000000"
//                                 step="0.01"
//                                 stringMode
//                             />
//                         </Form.Item>
//                         <Form.Item
//                             name="brand"
//                             label="Brand"
//                             rules={[
//                                 {
//                                     required: true,
//                                 },
//                             ]}
//                         >
//                             <Input/>
//                         </Form.Item>
//                         <Form.Item
//                             name="category_id"
//                             label="Category"
//                             rules={[
//                                 {
//                                     required: true,
//                                 },
//                             ]}
//                         >
//                             <TreeSelect
//                                 showSearch
//                                 style={{width: '100%'}}
//                                 dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
//                                 placeholder="Please select"
//                                 allowClear
//                                 onSelect={this.onSelect}
//                             >
//                                 {renderTreeNode(category_tree, true)}
//                             </TreeSelect>
//                         </Form.Item>
//                         <Form.Item
//                             name="is_new"
//                             label="Isnew"
//                             rules={[
//                                 {
//                                     required: true,
//                                 },
//                             ]}
//                         >
//                             <Select>
//                                 <Option value={0}>not new</Option>
//                                 <Option value={1}>new</Option>
//                             </Select>
//                         </Form.Item>
//
//
//                         <Form.Item wrapperCol={{...this.layout.wrapperCol, offset: 8}}>
//                             <Button type="primary" htmlType="submit">
//                                 Submit
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                     <Button type="primary" onClick={this.cancel}>Cancel</Button>
//                 </Modal>
//             </div>
//
//     );
// }

function AdminAddGoodsPanel() {

}

export default AdminAddGoodsPanel;