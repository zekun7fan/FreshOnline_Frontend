import React from 'react';
import {Avatar, Dropdown, Menu} from "antd";
import {NavLink} from "react-router-dom";
import {getUserId, getUserName, getUserType, UserType} from "../../utils/user";

function UserIcon() {


    const menu = () => {
        const id = getUserId()
        switch (getUserType()) {
            case UserType.CUSTOMER:
                return (
                    <Menu>
                        <Menu.Item key="1">
                            <NavLink to={`/customer`}>user center</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to={'/logout'}>logout</NavLink>
                        </Menu.Item>
                    </Menu>
                )
            case UserType.ADMINISTRATOR:
                return (
                    <Menu>
                        <Menu.Item key="1">
                            <NavLink to={'/admin'}>admin panel</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to={'/logout'}>logout</NavLink>
                        </Menu.Item>
                    </Menu>
                )
            default:
                return (
                    <Menu>
                        <Menu.Item key="1">
                            <NavLink to={'/login'}>login</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to={'/register'}>register</NavLink>
                        </Menu.Item>
                    </Menu>
                )
        }
    };

    return (
        <div>
            <div>
                <Dropdown overlay={menu}>
                    <Avatar size={40} shape={'square'}>{getUserName()}</Avatar>
                </Dropdown>
            </div>
        </div>
    );
}

export default UserIcon;