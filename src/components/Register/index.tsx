import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Form, FormInstance, Input, message, Row, Select} from "antd";
import {User} from "../../net/reqBody";
import {login, register} from "../../net";
import {Resp} from "../../net/resp";
import Text from "antd/es/typography/Text";
import TextArea from "antd/es/input/TextArea";
import  "./index.css"
import {useNavigate} from "react-router";

const {Option} = Select

interface UserInfo {
    id?: number,
    name?: string,
    password: string,
    password2: string,
    email: string,
    type?: number,
    localtion?: string

}


function Register() {
    const navigate = useNavigate();
    const ref = useRef<FormInstance>(null)

    const onFinish = async (userinfo: UserInfo) => {
        const pwd : string = userinfo.password
        const pwd2 : string = userinfo.password2
        if (pwd !== pwd2){
            message.warn("two password must be same");
            return
        }
        const user : User = userinfo
        const raw = await register(user)
        const resp: Resp = raw.data
        message.info(resp.msg)
        ref.current!.resetFields()
        if (resp.code === 0){
            navigate('/login')
        }
    };

    return {ref, onFinish}

}

function RegisterUI() {

    const {ref, onFinish} = Register();

    return (
        <div id="login_div">
            <Row justify="center" align="middle" style={{minHeight: '30vh'}}>
                <Col span={24}>
                    <h2>Register</h2>
                </Col>


                <Form
                    ref={ref}
                    name="user"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: 'email' ,message: 'Please input your email!' }]}
                    >
                        <Input allowClear/>
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input user name!' }]}
                    >
                        <Input allowClear/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password allowClear/>
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="password2"
                        rules={[{ required: true, message: 'Please confirm your password!' }]}
                    >
                        <Input.Password allowClear/>
                    </Form.Item>

                    <Form.Item
                        label="User Type"
                        name="type"
                        rules={[{ required: true, message: 'Please select user type!' }]}
                    >
                        <Select>
                            <Option value={"0"}>
                                CUSTOMER
                            </Option>
                            <Option value={"1"}>
                                ADMINISTRATOR
                            </Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[{ message: 'Please input your location for delivery!' }]}
                    >
                        <TextArea/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <Button type="primary" htmlType="submit">
                            REGISTER
                        </Button>
                    </Form.Item>

                </Form>

            </Row>
        </div>
    );
}

export default RegisterUI;