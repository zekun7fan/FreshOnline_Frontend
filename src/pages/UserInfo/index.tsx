import React, {Component} from 'react';

import {Layout, Button ,Divider,Menu } from 'antd';
import CustomerAccount from "../../components/CustomerAccount";
import CustomerOrders from "../../components/CustomerOrders";
import AddressBook from "../../components/AddressBook";
import HomeFootPanel from "../../components/HomeFootPanel";
import HomepageHeader from "../../components/HomepageHeader";
import PaymentMethodPanel from "../../components/PaymentMethodPanel";
import { Route, Routes,Link,Navigate} from "react-router-dom";
import { PageHeader } from 'antd';
import {getUserId} from "../../utils/user";
import {SearchFooter} from"../SearchPage"

const { SubMenu } = Menu;
const { Header, Content, Footer,Sider } = Layout;

/**
 * Zetian Huang
 */
function UserInfo() {
    return (            
        getUserId()?
        <div>
        <Layout>
                <Layout style={{height: '600px'}}>
                <Sider>
                    <Button type="link">
                        <Link to={{pathname:'/customer/account'}}>My Account</Link>
                    </Button>
                    <Button type="link">
                        <Link to={{pathname:'/customer/address'}}>Address Book</Link>
                    </Button>
                    <Button type="link">
                        <Link to={{pathname:'/customer/orders'}}>My orders</Link>
                    </Button>
                    <Button type="link">
                        <Link to={{pathname:'/customer/payment'}}>Payment Methods</Link>
                    </Button>
                </Sider>
                <Content>
                    <Routes>
                        <Route path="account/*" element={<CustomerAccount />} />
                        <Route path="address" element={<AddressBook/>}/>
                        <Route path="orders" element={<CustomerOrders/>}/>
                        <Route path="payment" element={<PaymentMethodPanel/>}/>
                        <Route path="favorite" />
                    </Routes>
                </Content>
                </Layout>
            <Footer>
                <SearchFooter/>
            </Footer>
        </Layout>
        </div>:<Navigate replace to="/login" />
    );
}

export default UserInfo;
