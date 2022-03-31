import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import UserIcon from "../UserIcon";
import {Route, Routes} from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import AdminPanel from "../../pages/AdminPanel";
// import ErrorPage from "../ErrorPage";
import HomePage from "../../pages/HomePage";
import UserInfo from "../../pages/UserInfo";
//import GoodsDetailsDisplay from '../GoodsDetailsDisplay';
import {BulbOutlined} from "@ant-design/icons";
import SearchPage from "../../pages/SearchPage";

const { Header, Content, Sider, Footer } = Layout;

function Home() {
    return (
        <Layout>
            {/*<Header className="Home_header">*/}
            {/*    <Menu theme="dark" mode="horizontal">*/}
            {/*        <Menu.Item key="home_header1">FreshOnline <BulbOutlined/></Menu.Item>*/}
            {/*        <Menu.Item key="home_header2"><UserIcon/></Menu.Item>*/}
            {/*    </Menu>*/}
            {/*</Header>*/}
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/admin'} element={<AdminPanel/>}/>
                {/* <Route path={'/error'} element={ErrorPage}/> */}
                <Route path="/customer/*" element={<UserInfo/>}/>
                {/* <Route path={'/cart'} element={GoodsOverviewDisplay}/> */}
                {/* <Route path={'/goods/:goodsId'} render={({match}) => (<GoodsDetailsDisplay id={match.params.goodsId}/>)}/> */}
                <Route path={'/goods'} element={<SearchPage/>}/>
                <Route path={'/'} element={<HomePage/>}/>
            </Routes>
        </Layout>

    )
}

export default Home;

//                 <Route path={'/'} render={() => {
//                     return (<h2>Home page</h2>)
//                 }}/>