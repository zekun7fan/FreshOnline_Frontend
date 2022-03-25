import React, {useState} from 'react';
import Counter from "../Counter";
import {Router} from "react-router-dom";

function Main() {

    const [vv, setvv] = useState<boolean>(false)
    const [nn, setnn] = useState<number>(0)

    return (
        <div>
                <h1>Main nn is {nn}</h1>
                <button onClick={() => {setvv(true)}}>show counter</button>
                <button onClick={() => {setvv(false)}}>hide counter</button>
                <button onClick={() => {setnn(nn+1)}}>plus nn</button>
                <button onClick={() => {setnn(nn-1)}}>minus nn</button>
                <Counter visible={vv} main_num={nn}/>
        </div>
    );
}

export default Main;