import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import {User} from "../../net/reqBody";
import {login} from "../../net";
import {Resp} from "../../net/resp";

function Login() {

    const onFinish = async (user: User) => {
       console.log(user)
        const raw = await login(user)
        const resp: Resp = raw.data
        message.info(resp.msg)

    };



    return (
        <div>
            <h2>Login</h2>
            <Form
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
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password allowClear/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        LOGIN
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}



export default Login;