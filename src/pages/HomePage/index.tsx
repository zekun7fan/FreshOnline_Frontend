import React, {Component} from 'react';

import {BackTop , Layout, Button ,Divider} from 'antd';
import HomepageHeader from "../../components/HomepageHeader";
import SearchHeader from "../../components/SearchHeader";
import HomeFootPanel from "../../components/HomeFootPanel";
import CatogoryGoodsPanel from "../../components/CatogoryGoodsPanel";
import WeeklySpeicalPanl from "../../components/WeeklySpeicalPanl";
import UserIcon from "../../components/UserIcon";

import ContactUs from "../../components/ContactUs";
import { PageHeader } from 'antd';


const { Header, Content, Footer } = Layout;

const HomeContent = () => <div><WeeklySpeicalPanl/><CatogoryGoodsPanel/></div>

/**
 * Zetian Huang
 */
function Homepage() {
    return (
            <div> 
        <Layout>
            <Header>
                <HomepageHeader />
                <Divider />
            </Header>
            <Content>
                <HomeContent/>
            </Content>
            <Footer>
                <HomeFootPanel/>
            </Footer>
        </Layout>
        <BackTop>
            <div className='ant-back-top'>Back to Top</div>
        </BackTop>
        </div>
    );
}

export default Homepage;

