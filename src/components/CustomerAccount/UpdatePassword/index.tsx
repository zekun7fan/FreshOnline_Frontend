import React, {useEffect, useRef, useState} from 'react';
import { Form,Input,Divider,Col, Row,Button ,  Cascader,InputNumber,
                                               Select,
                                               Result} from 'antd';
import {updatePass} from "../../../net";
import {User} from "../../../utils/javamodel";
import {getUserId} from "../../../utils/user";
import { useNavigate } from 'react-router';

const { Option } = Select;

/**
 * @author Zetian Huang
 */

interface updateProps{
    visible:boolean
}
export default function UpdatePassword() {

    const [data, setData] = useState<User>({})

        const onFinish = (values:buttonValues) => {
            updateProcess(values);
        };
        let navigate = useNavigate();

        const updateProcess = async (values:buttonValues) => {
            const userId = getUserId()
            if(userId==null) return
            const resp = await updatePass(userId,values.old_password,values.password);
            const res = resp.data;
            if (res.code === 0){
                console.log(res);
                setData(res.data);
                navigate("/customer/account/UpdateSuccess")
             }else{
                alert(res.msg)
             }
        };


        const formData = (
            <div>
            <Form
                {...formItemLayout}
                name="control-ref" onFinish={onFinish}>
                <Form.Item
                name="old_password"
                label="Old Password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your old password!',
                    },
                ]}
                hasFeedback
                >
                <Input.Password />
                </Form.Item>
                <Form.Item
                name="password"
                label="New Password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                hasFeedback
                >
                <Input.Password />
                </Form.Item>

                <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                    required: true,
                    message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                    }),
                ]}
                >
                <Input.Password />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
            </div>
            );
        return formData;
        
}

interface buttonValues{
    old_password:string
    password:string
    confirm:string
}
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

