import React, {useState} from "react";
import {Layout, Breadcrumb} from 'antd';

import SearchHeader from "../../components/SearchHeader";
import SearchSider from "../../components/SearchSider";
import SearchContent from "../../components/SearchContent";

const { Header, Content, Sider, Footer } = Layout;

export default function SearchPage() {
    return (
        <Layout>
            <Header className="header">
                <SearchHeader />
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <SearchSider />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Search</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <SearchContent
                            // data={this.props.search_result}
                        />
                    </Content>
                </Layout>
            </Layout>
            <Layout>
                <Footer style={{ textAlign: 'center' }}>FreshOnline ©2022 Created by Team FreshOnline</Footer>
            </Layout>
        </Layout>
    );
}