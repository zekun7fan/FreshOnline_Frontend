import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Divider, Col, Row, Button, Collapse, message, List, Space} from 'antd';
import {User} from "../../utils/javamodel";
import {getUserId} from "../../utils/user";
import {Resp} from "../../net/resp";
import {queryUser, updateAddress} from "../../net";



const {Panel} = Collapse;


export default function AddressBook() {

    const [user, setUser] = useState<User>({})
    const [addr, setAddr] = useState<string | undefined>()

    const [list, setList] = useState<Array<string>>([])


    const setup = async () => {
        const userId = getUserId()
        if (userId == null) return
        const raw = await queryUser(userId)
        const resp: Resp = raw.data
        if (resp.code === 0) {
            const u: User = resp.data as User
            setUser(u)
            const loc = u.location
            if (loc != null && loc != "") {
                const arr: Array<string> = loc.split(',');
                setList(arr)
            }
        }
    }

    useEffect(() => {
        setup().catch()
    }, [])


    const onAddrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddr(e.target.value)
    };

    const addAddr = async () => {
        if (addr == null || addr == "") {
            message.warn("empty address is not acceptable")
            return;
        }
        let oldAddr = user.location
        let newAddr = '';
        if (oldAddr == null || oldAddr.length == 0) {
            newAddr = addr;
        } else {
            newAddr = oldAddr.concat(',').concat(addr)
        }
        const u : User = {...user, location: newAddr}
        const raw = await updateAddress(u)
        const resp: Resp = raw.data
        if (resp.code == 0) {
            setAddr(undefined)
            setUser(u)
            setList([...list, addr])
        }
        message.info(resp.msg)
    };


    const deleteLoc = async (val: string) => {
        const newlist = list.filter((item) => {
            return item != val;
        })
        let str = '';
        newlist.forEach((item) => {
            str.concat(item).concat(',')
        })
        const newloc = str.length > 0 ? str.slice(0, -1) : "";
        const u: User = {...user, location: newloc};
        const raw = await updateAddress(u)
        const resp: Resp = raw.data
        if (resp.code == 0){
            setUser(u)
            setList(newlist)
        }
    };


    return (
        <div style={{paddingLeft: '60px', paddingTop: '40px', paddingRight: '60px'}}>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="ADD NEW ADDR" key="1">
                    <Space>
                        <Input
                            placeholder={"input new addr"}
                            onChange={onAddrChange}
                            required={true}
                            value={addr}
                            style={{minWidth: '500px'}}
                        />
                        <Button onClick={addAddr}>Confirm</Button>
                    </Space>
                </Panel>
            </Collapse>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[<Button onClick={() => {deleteLoc(item) .catch()}}>Delete</Button>]}
                    >
                        <h1>{item}</h1>
                    </List.Item>
                )}
            />
        </div>


    )
}

