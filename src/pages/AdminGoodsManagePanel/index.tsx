import React from 'react';
import {Layout} from "antd";
import AdminSearchHeader from "../../components/AdminSearchHeader";
import {Content, Header} from "antd/es/layout/layout";
import AdminGoodsDisplay from "../../components/AdminGoodsDisplay";

function AdminGoodsManagePanel() {
    return (
        <div id="123">
            <Layout >
                <Header style={{height: 150}}>
                    <AdminSearchHeader/>
                </Header>
                <Content style={{}}>
                    <AdminGoodsDisplay/>
                </Content>
            </Layout>
        </div>
    );
}

export default AdminGoodsManagePanel;