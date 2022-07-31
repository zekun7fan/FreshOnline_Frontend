import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Empty, List, Rate, Comment} from 'antd';
import {SaledGoods} from "../../utils/javamodel";
import {getFeedBack} from "../../net";
import {Resp} from "../../net/resp";
import moment from "moment";



interface FeedBackListProps {
    id : number
}


function FeedBackList(props : FeedBackListProps) {

    const [data, setData] = useState<Array<SaledGoods>>([])

    useEffect(() => {
        loadData(props.id).catch()
    }, [])


    const loadData = async (id: number) => {
        const raw = await getFeedBack(id)
        const resp: Resp = raw.data
        if (resp.code == 0) {
            setData(resp.data as Array<SaledGoods>)
        }
    };

    return (
        <div style={{paddingLeft: '120px', paddingTop: '40px'}}>
            <h3>Feed back from customers</h3>
            {
                data.length > 0 ?
                    <List
                        className="comment-list"
                        header={`${data.length} feedbacks`}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={"anonymous user"}
                                    content={(
                                        <div>
                                            <Rate disabled={true} defaultValue={item.rate!}/>
                                            <p>{item.comment}</p>
                                        </div>
                                    )}
                                    datetime={moment(item.reviewTime).format('MM/DD/YYYY')}
                                />
                            </li>
                        )}
                    /> : <Empty/>

            }

        </div>
    );
}

export default FeedBackList;