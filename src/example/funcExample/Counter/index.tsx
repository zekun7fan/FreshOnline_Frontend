import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, InputRef} from "antd";
import {BaseSelectRef} from "rc-select";
import {toQueryString} from "../../../net/http";

interface CounterProps {
    visible : boolean
    main_num : number
}


interface ex1 {
    id: number,
    name?: string,
    age?: number

}

// execute Counter function when mount, update
function Counter(props: CounterProps) {


    console.log("exec Counter Func")

    const e1 : ex1 = {
        id: 10,
        age :3
    }

    const s1 = toQueryString(e1)
    console.log("str=",s1)

    // skip when update
    const [count, setCount] = useState<number>(0)
    const [count2, setCount2] = useState<number>(0)
    const [n, setn] = useState<number>(0)


    // componentDidMount
    useEffect(() => {
        console.log("mount")
        // componentWillUnmount
        return () => {
            console.log("unmount")
        };
    }, [])


    // componentDidUpdate, componentWillUpdate
    useEffect(() => {
        console.log(`count has updated, now count is ${count}`)
        return () => {
            console.log(`count will update, now count is ${count}`)
        };
    }, [count])

    useEffect(() => {
        console.log(`count2 has updated, now count is ${count2}`)
        return () => {
            console.log(`count2 will update, now count is ${count2}`)
        };
    }, [count2])

    useEffect(() => {
        setn(props.main_num)
    }, [props.main_num])

    // reactNode
    return (
        props.visible ?
        <div>
            <h3>Main nn is {n}</h3>
            <h3>Count is {count}</h3>
            <h3>Count2 is {count2}</h3>
            <button onClick={() => {setn(n + 1)}}>plus main nn</button>
            <button onClick={() => {setCount(count + 1)}}>plus count 1</button>
            <button onClick={() => {setCount2(count2 + 1)}}>plus count 2</button>
            <Button/>
        </div> : null
    );
}

export default Counter;