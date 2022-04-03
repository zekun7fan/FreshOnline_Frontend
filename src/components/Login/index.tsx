import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import {User} from "../../net/reqBody";
import {login} from "../../net";
import {LoginedUserInfo, Resp} from "../../net/resp";
import { useNavigate } from 'react-router';
import {user_id_key, user_name_key, user_token_key, user_type_key} from "../../utils/user";


export function Login() {
    let navigate = useNavigate();

    const onFinish = async (user: User) => {
        const raw = await login(user)
        const resp: Resp = raw.data
        if (resp.code === 0){
            const info: LoginedUserInfo = resp.data as LoginedUserInfo
            localStorage.setItem(user_id_key, String(info.id))
            localStorage.setItem(user_name_key, info.name)
            localStorage.setItem(user_type_key, String(info.type))
            localStorage.setItem(user_token_key, info.token)
            //huang added code here
             navigate(`/`);
        }
        message.info(resp.msg)
    };

    return { localStorage, onFinish }
}

export default function LoginUI() {

    const { onFinish } = Login()

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