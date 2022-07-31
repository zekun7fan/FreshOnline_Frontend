import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {OrderDetail, SaledGoods, SaledGoodsDetail} from "../../utils/javamodel";
import {Modal, Card, List, Space, Image, Empty, Rate, Input, Button, message} from 'antd';
import {updateSaledGoods} from "../../net";
import {Resp} from "../../net/resp";
import {getFullPicUrl} from "../../utils/utils";

const {TextArea} = Input;


interface OrderCommentModalProps {
    order: OrderDetail,
    click: number
}

function OrderCommentModal(props: OrderCommentModalProps) {

    const [data, setData] = useState<Array<SaledGoodsDetail>>([])
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        setVisible(props.click > 0)
        setData(props.order.goodsList!)
    }, [props.click])

    const handleOk = () => {
        setVisible(false)
    };

    const handleCancel = () => {
        setVisible(false)
    };


    const refresh = (orderId: number, goodsId: number): void => {
        const newdata = [...data];
        newdata.forEach((item) => {
            if (item.orderId == orderId && item.goodsId == goodsId) {
                item.reviewed = true;
                item.reviewTime = new Date();
            }
        })
        setData([...newdata]);
    };


    return (
        <div>
            <Modal
                title="Order FeedBack"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                okText={"confirm"}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    rowKey={(item) => {
                        return item.goodsId!
                    }}
                    pagination={{
                        pageSize: 1,
                    }}
                    renderItem={item => (
                        <CommentPanel item={item} refresh={refresh}/>
                    )}
                />
            </Modal>

        </div>
    );
}

export default OrderCommentModal;


interface CommentPanelProps {
    item: SaledGoodsDetail,
    refresh: Function
}

function CommentPanel(props: CommentPanelProps) {

    const [item, setItem] = useState<SaledGoodsDetail>({...props.item})

    useEffect(() => {
        setItem({...props.item})
    }, [props.item.orderId, props.item.goodsId])

    const comment = async () => {
        const saledGoods: SaledGoods = {
            orderId: item.orderId,
            goodsId: item.goodsId,
            rate: item.rate,
            comment: item.comment
        };
        const raw = await updateSaledGoods(saledGoods);
        const resp: Resp = raw.data
        if (resp.code == 0) {
            setItem({...item, reviewed: true})
            props.refresh();
        }
        message.info(resp.msg)
    };

    return (
        <div>
            <Card title={item.name} size="small">
                {
                    item.pic != null ?
                        <Image
                            height={200}
                            width={200}
                            src={getFullPicUrl(item.pic!.split(',')[0])}
                        /> : <Empty/>
                }
            </Card>
            <Rate
                disabled={item.reviewed}
                value={item.rate}
                onChange={(rate) => {
                    setItem({...item, rate: rate})
                }}/>
            <TextArea
                showCount={true}
                maxLength={50}
                rows={2}
                placeholder={"please comment on this goods"}
                disabled={item.reviewed}
                value={item.comment != null ? item.comment : ""}
                onChange={(e) => {
                    setItem({...item, comment: e.target.value})
                }}
            />
            {
                !item.reviewed ? <Button
                    onClick={comment}>finish
                </Button> : null
            }
        </div>
    )
}





