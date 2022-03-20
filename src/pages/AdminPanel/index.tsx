import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {NavLink, Route} from "react-router-dom";

import {
    EditOutlined,
    AreaChartOutlined
} from '@ant-design/icons';
import {Content} from "antd/es/layout/layout";
import { Routes} from "react-router";
import AdminCategoryManagePanel from "../AdminCategoryManagePanel";
import AdminGoodsManagePanel from "../AdminGoodsManagePanel";


function AdminPanel() {

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };

    return (
        <div>
            <Layout style={{minHeight: '100vh', minWidth: '200vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<EditOutlined/>}>
                            <NavLink to={'/admin/goods_management'}>GOODS MANAGEMENT</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<EditOutlined/>}>
                            <NavLink to={'/admin/category_management'}>CATEGORY MANAGEMENT</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<AreaChartOutlined/>}>
                            <NavLink to={'/admin/goods_statistics'}>GOODS STATISTICS</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{margin: '0 16px'}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Routes>
                                <Route path={'/admin/goods_management'} children={AdminGoodsManagePanel}/>
                                <Route path={'/admin/category_management'} children={AdminCategoryManagePanel}/>
                                {/*<Redirect to={'/admin/goods_management'}/>*/}
                            </Routes>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default AdminPanel;