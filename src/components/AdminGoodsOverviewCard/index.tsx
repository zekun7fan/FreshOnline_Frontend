import React, {useState} from 'react';
import {Goods} from "../../net/reqBody";
import {Divider, Button, Rate, Popconfirm, message, Empty, Card} from "antd";
import { EditTwoTone, DeleteTwoTone} from '@ant-design/icons';
import {getFirstPicUrl, getFullPicUrl} from "../../utils/utils";
import AdminEditGoodsPanel from "../AdminEditGoodsPanel";



export interface AdminGoodsOverviewCardProps {
    goods: Goods,
    deleteItem: Function

}



export function AdminGoodsOverviewCard(props: AdminGoodsOverviewCardProps) {

    const firstUrl = getFirstPicUrl(props.goods.pic)
    const price_symbol = props.goods.type === 0 ? ("$") : ("$/lb")


    const [popconfirm_visible, setPopconfirmVisible] = useState(false)
    const [showEditGoodsPanel, setShowEditGoodsPanel] = useState(false)

    const onAttemptToDelete = () => {
        setPopconfirmVisible(true)
    };

    const onDeleteCancel = () => {
        setPopconfirmVisible(false)
    };

    const onDeleteConfirm = async () => {
        const id = props.goods.id;
        setPopconfirmVisible(false)
        props.deleteItem(id);
    };

    const onEdit = () => {
        setShowEditGoodsPanel(true);
    };

    const changeEditGoodsPanelVisible = (visible: boolean) => {
        setShowEditGoodsPanel(visible)
    };

    return {onAttemptToDelete, onDeleteCancel, onDeleteConfirm, onEdit, changeEditGoodsPanelVisible, firstUrl, price_symbol, popconfirm_visible, showEditGoodsPanel}



}

function AdminGoodsOverviewCardUI(props: AdminGoodsOverviewCardProps) {

    const {onAttemptToDelete, onDeleteCancel, onDeleteConfirm, onEdit, changeEditGoodsPanelVisible, firstUrl, price_symbol, popconfirm_visible, showEditGoodsPanel} = AdminGoodsOverviewCard(props)

    return (
        <div>
            <div>
                <Card
                    cover={
                        firstUrl ?
                            <img
                                style={{minWidth: '200px', minHeight: '200px', maxWidth: '200px', maxHeight: '200px'}}
                                alt={props.goods.name}
                                src={getFullPicUrl(firstUrl)}
                            /> : <Empty/>
                    }
                    actions={[
                        <Button type="primary" shape="round" icon={<EditTwoTone />} size="large" onClick={onEdit}>
                            Edit
                        </Button>,
                        <Popconfirm
                            title="Are you sure to take this goods off the shelf?"
                            onConfirm={onDeleteConfirm}
                            onCancel={onDeleteCancel}
                            okText="Yes"
                            cancelText="No"
                            visible={popconfirm_visible}
                        >
                            <Button type="primary" shape="round" icon={<DeleteTwoTone />} size="large" onClick={onAttemptToDelete}>
                                Delete
                            </Button>
                        </Popconfirm>,
                    ]}
                >
                    <p>Goods Name: {props.goods.name}</p>
                    <Divider />
                    <Rate allowHalf defaultValue={props.goods.rate} disabled={true}/>Rate Count:{props.goods.rateCount}
                    <Divider />
                    {props.goods.onsale===1?<p>Sale Price:{props.goods.salePrice}</p>:<p>Price:{props.goods.price}</p>}{price_symbol}
                </Card>
                <AdminEditGoodsPanel goods={props.goods} visible={showEditGoodsPanel} changeVisible={changeEditGoodsPanelVisible}/>
            </div>

        </div>
    );
}

export default AdminGoodsOverviewCardUI;