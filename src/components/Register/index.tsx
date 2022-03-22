import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormInstance, Input, message, Select} from "antd";
import {User} from "../../net/reqBody";
import {login, register} from "../../net";
import {Resp} from "../../net/resp";
import Text from "antd/es/typography/Text";
import TextArea from "antd/es/input/TextArea";


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


    const ref = useRef<FormInstance>(null)


    const onFinish = async (userinfo: UserInfo) => {
        console.log(userinfo)
        const pwd : string = userinfo.password
        const pwd2 : string = userinfo.password2
        if (pwd !== pwd2){
            message.warn("two password must be same");
            return
        }
        const user : User = userinfo
        console.log("user info", userinfo)
        console.log("user", user)
        const raw = await register(user)
        const resp: Resp = raw.data
        message.info(resp.msg)
        ref.current!.resetFields()
    };


    return (
        <div>
            <h2>Register</h2>
            <Form
                ref={ref}
                name="user"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
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

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        REGISTER
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;