import React from 'react';
import {Layout} from 'antd';
import {Route, Routes} from "react-router-dom";
import LoginUI from "../Login";
import Register from "../Register";
import AdminPanel from "../../pages/AdminPanel";
import HomePage from "../../pages/HomePage";
import UserInfo from "../../pages/UserInfo";
import SearchPage, {SearchFooter} from "../../pages/SearchPage";
import Logout from "../Logout";
import PaymentMethodPanel from "../PaymentMethodPanel";
import GoodsOverviewDisplay from '../GoodsOverviewDisplay';
import GoodsDetailsDisplay from '../GoodsDetailsDisplay';
import SearchHeaderUI from "../SearchHeader";
import {ErrorPage} from "../../ErrorPage";
const { Header } = Layout;

function Home() {
    return (
        <Layout>
            <Header className="header">
                <SearchHeaderUI />
            </Header>
            <Routes>
                <Route path={'/login'} element={<LoginUI/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/logout'} element={<Logout/>}/>
                <Route path={'/admin/*'} element={<AdminPanel/>}/>
                <Route path={'/error'} element={ErrorPage}/>
                <Route path="/customer/*" element={<UserInfo/>}/>
                <Route path={'/cart'} element={<GoodsOverviewDisplay/>}    />
                <Route path={'/goods/:goodsId'} element={<GoodsDetailsDisplay/>}/>
                <Route path={'/goods'} element={<SearchPage/>}/>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/payment/*'} element={<PaymentMethodPanel/>}/>
            </Routes>
            <SearchFooter/>
        </Layout>

    )
}

export default Home;
