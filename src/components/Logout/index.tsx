import React, {useEffect, useState} from 'react';
import {getUserInfo} from "../../utils/user";
import {User} from "../../net/reqBody";
import {Resp} from "../../net/resp";
import {logout} from "../../net";
import {message} from "antd";
import { useNavigate } from "react-router-dom";

function Logout() {

    const navigate = useNavigate();

    let timer: ReturnType<typeof setTimeout>;

    const [status, setStatus] = useState<string>('attempt to logout')

    useEffect(() => {
        const user = getUserInfo();
        toLogout(user).catch()
        return () => {
            clearTimeout(timer)
        };
    },[])

    const toLogout = async (user: User) => {
        const raw = await logout(user)
        const resp : Resp = raw.data
        message.info(resp.msg)
        setStatus('successfully logout')
        timer = setTimeout(() => {
            navigate('/home')
        }, 2000)
    };

    return (
        <div>
            <h2>{status}</h2>
        </div>
    );
}

export default Logout;