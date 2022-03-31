import React from 'react';
import {Layout} from "antd";
import AdminSearchHeader from "../../components/AdminSearchHeader";
import {Content, Header} from "antd/es/layout/layout";
import AdminGoodsDisplay from "../../components/AdminGoodsDisplay";

function AdminGoodsManagePanel() {
    return (
        <div>
            <Layout >
                <Header style={{height: 150}}>
                    <AdminSearchHeader/>
                </Header>
                <Content style={{height: 650}}>
                    <AdminGoodsDisplay/>
                </Content>
            </Layout>
        </div>
    );
}

export default AdminGoodsManagePanel;