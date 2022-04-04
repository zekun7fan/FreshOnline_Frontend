import React, {Component} from 'react';

import {BackTop , Layout, Button ,Divider} from 'antd';

import CategoryGoodsPanelUI from "../../components/CatogoryGoodsPanel";
import WeeklySpeicalPanlUI from "../../components/WeeklySpeicalPanl";


const { Header, Content, Footer } = Layout;

const HomeContent = () => <div><WeeklySpeicalPanlUI/><CategoryGoodsPanelUI/></div>

/**
 * Zetian Huang
 */
function Homepage() {
    return (
            <div> 
        <Layout>
            <Content>
                <HomeContent/>
            </Content>
        </Layout>
        <BackTop>
            <div className='ant-back-top'>Back to top</div>
        </BackTop>
        </div>
    );
}

export default Homepage;

