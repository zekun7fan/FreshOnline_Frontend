import React, {ChangeEventHandler, useEffect, useState} from 'react';
import {logout, queryUser, updatePwd} from "../../net";
import {Button, Col, Collapse, Input, message, Row, Select, Space} from 'antd';
import {getUserId, getUserTypeStr} from "../../utils/user";
import {User} from "../../utils/javamodel";
import {Link, Route, Routes} from "react-router-dom";
import {Resp} from "../../net/resp";
import {useNavigate} from "react-router";

const {Option} = Select;
const {Panel} = Collapse;


function CustomerAccount() {


    const navigate = useNavigate();

    const [data, setData] = useState<User>({})

    const [pwd, setPwd] = useState<string | undefined>()


    const setup = async () => {
        const userId = getUserId()
        if (userId == null) return
        const resp = await queryUser(userId)
        const res = resp.data
        if (res.code === 0) {
            setData(res.data as User)
        }
    }

    useEffect(() => {
        setup().catch()
    }, [])


    const onPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value)
    };

    const changePwd = async () => {
        if (pwd == null || pwd.length == 0) {
            message.warn("empty password is not acceptable")
            return;
        }
        const u: User = {...data, password: pwd}
        const raw = await updatePwd(u);
        const resp: Resp = raw.data
        message.info(resp.msg)
        if (resp.code == 0) {
            setPwd(undefined);
            const raw2 = await logout(u)
            const resp2: Resp = raw2.data
            if (resp2.code == 0) {
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
        }
    };


    return (
        <div style={{paddingLeft: '60px', paddingTop: '40px', paddingRight: '60px'}}>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="NEED TO CHANGE PASSWORD?" key="1">
                    <Space>
                        <Input
                            placeholder={"input new password"}
                            onChange={onPwdChange} required={true}
                            value={pwd}
                            style={{minWidth: '500px'}}
                        />
                        <Button onClick={changePwd}>Confirm</Button>
                    </Space>
                </Panel>
            </Collapse>
            <div>
                <Row gutter={24}>
                    <Col span={12}>
                        <h1> Name: </h1>
                    </Col>
                    <Col span={12}>
                        <h1> {data.name} </h1>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <h1> Email: </h1>
                    </Col>
                    <Col span={12}>
                        <h1> {data.email} </h1>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <h1> User Type: </h1>
                    </Col>
                    <Col span={12}>
                        <h1> {getUserTypeStr()} </h1>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default CustomerAccount;

