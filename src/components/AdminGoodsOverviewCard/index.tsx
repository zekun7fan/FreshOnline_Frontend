import React, {useState} from 'react';
import {Goods} from "../../net/reqBody";
import {Divider, Button, Rate, Popconfirm, message, Empty, Card} from "antd";
import { EditTwoTone, DeleteTwoTone} from '@ant-design/icons';
import {getFirstPicUrl} from "../../utils/utils";
import {deleteGoods} from "../../net";
import {Resp} from "../../net/resp";
import AdminEditGoodsPanel from "../AdminEditGoodsPanel";



interface AdminGoodsOverviewCardProps {
    goods: Goods,
    deleteItem: Function

}

function AdminGoodsOverviewCard(props: AdminGoodsOverviewCardProps) {


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
        const raw = await deleteGoods(id!)
        const resp: Resp = raw.data
        message.info(resp.msg)
        if (resp.code === 0){
            setPopconfirmVisible(false)
            props.deleteItem(id);
        }
    };

    const onEdit = () => {
        setShowEditGoodsPanel(true);
    };


    return (
        <div>
            <div>
                <Card
                    cover={
                        firstUrl ?
                            <img
                                alt={props.goods.name}
                                src={firstUrl}
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
                    <Rate allowHalf defaultValue={props.goods.rate} disabled={true}/>Rate Count:{props.goods.rate_count}
                    <Divider />
                    {props.goods.onsale===1?<p>Sale Price:{props.goods.salePrice}</p>:<p>Price:{props.goods.price}</p>}{price_symbol}
                </Card>
                <AdminEditGoodsPanel goods={props.goods} visible={showEditGoodsPanel}/>
            </div>

        </div>
    );
}

export default AdminGoodsOverviewCard;