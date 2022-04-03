import React, {Component} from 'react';

import {BackTop , Layout, Button ,Divider} from 'antd';
import HomepageHeader from "../../components/HomepageHeader";
import SearchHeaderUI from "../../components/SearchHeader";
import HomeFootPanel from "../../components/HomeFootPanel";
import CategoryGoodsPanelUI from "../../components/CatogoryGoodsPanel";
import WeeklySpeicalPanlUI from "../../components/WeeklySpeicalPanl";
import UserIcon from "../../components/UserIcon";
import {SearchFooter} from"../SearchPage"

import ContactUs from "../../components/ContactUs";
import { PageHeader } from 'antd';


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

