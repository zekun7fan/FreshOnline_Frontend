import React, {useState} from "react";

import {Button, Cascader, Input, Menu, Row, Col} from "antd";
import {BulbOutlined} from "@ant-design/icons";

export default function SearchHeader() {


    return (
        <div className="logo">
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="header1">FreshOnline <BulbOutlined/></Menu.Item>
                <Menu.Item key="header2">
                    {/*<Cascader options={category_tree}*/}
                    {/*          onChange={this.onChangeCategory}*/}
                    {/*          changeOnSelect={true}*/}
                    {/*          expandTrigger={"hover"}*/}
                    {/*          placeholder="Please select" />*/}
                </Menu.Item>
                <Menu.Item key="header3">
                    {/*<Input key="SearchInput" placeholder="meat"  style={{ width: '70%' }}*/}
                    {/*       ref={this.SearchRef} onPressEnter={this.onChangeKeyword} />*/}
                    {/*<Button type="primary" onClick={this.onChangeKeyword}>Submit</Button>*/}
                </Menu.Item>
                <Menu.Item key="header4"><Button>Login/Sign up</Button></Menu.Item>
                <Menu.Item key="header5"><Button>Cart</Button></Menu.Item>
            </Menu>
        </div>
    );
}