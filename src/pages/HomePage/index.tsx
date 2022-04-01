import React, {Component} from 'react';

import {BackTop , Layout, Button ,Divider} from 'antd';
import HomepageHeader from "../../components/HomepageHeader";
import SearchHeader from "../../components/SearchHeader";
import HomeFootPanel from "../../components/HomeFootPanel";
import CatogoryGoodsPanel from "../../components/CatogoryGoodsPanel";
import WeeklySpeicalPanl from "../../components/WeeklySpeicalPanl";
import UserIcon from "../../components/UserIcon";
import {SearchFooter} from"../SearchPage"

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
            <Content>
                <HomeContent/>
            </Content>
            <Footer>
                <SearchFooter/>
            </Footer>
        </Layout>
        <BackTop>
            <div className='ant-back-top'>Back to top</div>
        </BackTop>
        </div>
    );
}

export default Homepage;

