import React, {Component} from "react";
import {Link,Route} from 'react-router-dom'
import UserIcon from "../UserIcon";

import {Layout, Button, Menu} from 'antd';

/**
 * @author Zetian Huang
 */
function HomePageHeader() {
        return (
                    <div>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="header1"><UserIcon /></ Menu.Item>
                        <Menu.Item key="header2">
                        <Button ><Link to="/">Home</Link></Button>
                        </ Menu.Item>
                        <Menu.Item key="header3">
                        <Button > <Link to="/customer">My account</Link></Button>
                        </ Menu.Item>
                        <Menu.Item key="header4">
                        <Button > <Link to="/cart">Cart</Link></Button>
                        </ Menu.Item>
                        <Menu.Item key="header5">
                        <Button >Link Button5</Button>
                        </ Menu.Item>
                    </Menu>
                </div>
        );
}



export default HomePageHeader;