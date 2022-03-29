import React, {useEffect, useRef, useState} from 'react';
import {queryUser} from "../../net";
import { Form,Input,Divider,Col, Row,Button ,  Cascader,InputNumber,
                                               Select,
                                               Checkbox} from 'antd';
import UpdatePassword from "./UpdatePassword"
import UpdateSuccess from "./UpdateSuccess"
import {getUserId} from "../../utils/user";
import {User} from "../../utils/javamodel";
import {Route, Routes,Link} from "react-router-dom";

const { Option } = Select;
/**
 * @author Zetian Huang
 */
function CustomerAccount() {

    const [data, setData] = useState<User>({})

    const componentDidMount = async () => {
        const userId = getUserId()
        if(userId==null) return 
        else{
            const resp = await queryUser(userId)
            const res = resp.data
            if (res.code === 0){
                setData(res.data)
            }
         }
    }

    useEffect(() => {
        componentDidMount()
        return () => {
        };
    }, [])        
        const element = (
            <div>
               <Row gutter={16}>
                    <Col span={8}>
                        <h1> Name </h1>
                    </Col>
                    <Col span={8}>
                        <h1> {data.name} </h1>
                    </Col>
               </Row>
               <Row gutter={16}>
                    <Col span={8}>
                        <h1> Email </h1>
                    </Col>
                    <Col span={8}>
                        <h1> {data.email} </h1>
                    </Col>
                </Row>
                <Row gutter={16}>
                <Button type="link">
                        <Link to={{pathname:"/customer/account/ChangePassword"}}>Change password</Link>
                    </Button>
                </Row>
                <Row>
                     <Routes>
                        <Route path="ChangePassword" element={<UpdatePassword/>}/>
                        <Route path="UpdateSuccess" element={<UpdateSuccess />}/>
                    </Routes>
                </Row>
            </div>
        );
        return element;
}

export default CustomerAccount;

