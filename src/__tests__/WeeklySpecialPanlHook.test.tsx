import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import React from "react";
import { jest } from '@jest/globals';

import WeeklySpeicalPanlUI, {format, WeeklySpecialPanl} from "../components/WeeklySpeicalPanl";
import {StockedGoods} from "../utils/javamodel";
import {queryWeeklySpecial} from "../net";
import axios from "axios";

// descriptions:
// 需要对组件进行重构，大致分为工具类函数，负责存储状态和更新状态函数的函数组件，UI类函数组件
// 我们测试的是工具类函数，以及负责存储状态的函数，UI类函数
// 具体例子 WeeklySpecialPanl函数组件的重构，这个组件原先和CategoryGoodsPanl是差不多的，可以对比来看我的重构思路
// 重构之后拆解成不同的函数
// PS：并不保证我的重构思路一定合理
// 注意 这个方法不一定能适用于其他函数组件

// descriptions:
// renderHook函数用来挂载想要挂载的函数组件
// 首先把测试独立的工具类函数组件

afterEach(() => {
    cleanup().then()
})

test('render format using hook', () => {
    const { result } = renderHook(() => format([]))
    expect(typeof result.current).toBe('object')
    expect(result.current).toStrictEqual([])
})

test('test format functionality using hook', () => {
    let data:StockedGoods = {id: 1}
    let test_data:StockedGoods[] = [data,data,data,data,data,data,data,data,data,data,data]
    const { result } = renderHook(() => format(test_data))
    expect(typeof result.current).toBe('object')
    expect(test_data.length).toBe(11)
    expect(result.current.length).toBe(10)
})


// description:
// 测试负责存储状态和更新状态的函数组件
// WeeklySpecialPanl -> queryWeeklySpecial() -> get('/weekly_special', {}) -> axios.get(url + toQueryString(param))
// 核心是模拟axios 不然网络会报错
// can work with interceptor, check api documents plz

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('render Weekly Special Panel using hook', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: { code:0, data:[{id:1}] }})
    const { result, waitForNextUpdate } = renderHook(() => WeeklySpecialPanl())
    expect(result.current.data.length).toBe(0)
    await waitForNextUpdate()
    expect(result.current.data).toEqual([{id:1}])

    const { update } = result.current
    mockedAxios.get.mockResolvedValueOnce({data: { code:0, data:[{id:1}, {id:2}] }})
    await act(() => update())
    expect(result.current.data).toEqual([{id:1}, {id:2}])

    mockedAxios.get.mockResolvedValueOnce({data: { code:1}})
    // code === 0?
    await act(() => update())
    expect(result.current.data).toEqual([{id:1}, {id:2}])
})

test('render Weekly Special Panel UI using hook', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: { code:0, data:[{id:1},{id:2},{id:3}] }})
    const { result, waitForNextUpdate } = renderHook(() => WeeklySpeicalPanlUI())
    await waitForNextUpdate()
    expect(typeof result.current.props.children[0].type).toBe("function")
    expect(typeof result.current.props.children[1].type).toBe("string")
    expect(result.current.props.children[2].key).toEqual("row")
    expect(result.current.props.children[2].props.children.length).toEqual(3)
    expect(typeof result.current.props.children[3].type).toBe("function")
})