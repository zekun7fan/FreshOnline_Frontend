import React, {useState} from "react";
import {Layout, Breadcrumb, Divider} from 'antd';

import SearchHeaderUI from "../../components/SearchHeader";
import SearchSiderUI from "../../components/SearchSider";
import SearchContentUI from "../../components/SearchContent";
import {Link} from "react-router-dom";

const { Header, Content, Sider, Footer } = Layout;

export default function SearchPage() {
    return (
        <Layout>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <SearchSiderUI />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Search</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}>
                        <SearchContentUI/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export function SearchFooter() {
    return (
        <Layout>
            <Divider />
            <Footer style={{ textAlign: 'center' }}>FreshOnline ©2022 Created by Team FreshOnline</Footer>
        </Layout>
    )
}