import React, {useEffect, useState} from 'react';
import {
    getUserId,
    getUserInfo,
    getUserName, getUserType,
    user_id_key,
    user_name_key,
    user_token_key,
    user_type_key
} from "../../utils/user";
import {Resp} from "../../net/resp";
import {logout} from "../../net";
import {Button, message} from "antd";
import { useNavigate } from "react-router-dom";


function Logout() {

    let timer: NodeJS.Timeout| undefined = undefined;
    const navigate = useNavigate();
    const [status, setStatus] = useState<string>(`currently login user: 
    Id:${getUserId()}, 
    Name: ${getUserName()}, 
    Type: ${getUserType()}
    `)


    useEffect(() => {
        return () => {
            if (timer != null) {
                clearTimeout(timer);
            }
        };
    }, [])

    const toLogout = async () => {
        const user = getUserInfo();
        if (user == null){
            message.warn("user alread logout")
            return
        }
        const raw = await logout(user)
        const resp : Resp = raw.data
        localStorage.removeItem(user_id_key)
        localStorage.removeItem(user_name_key)
        localStorage.removeItem(user_type_key)
        localStorage.removeItem(user_token_key)
        message.info(resp.msg)
        setStatus('successfully logout')
        setTimeout(() => {
            navigate('/home');
        }, 2000)
    };

    return {status, toLogout}
}

function LogoutUI() {

    const {status, toLogout} = Logout();

    return (
        <div>
            <h2>{status}</h2>
            <Button onClick={toLogout}>LOGOUT</Button>
        </div>
    );
}

export default LogoutUI;