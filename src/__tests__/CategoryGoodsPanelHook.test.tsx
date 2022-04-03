import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { jest } from '@jest/globals';

import CategoryGoodsPanelUI, {CategoryGoods, CategoryGoodsPanel, formatData} from "../components/CatogoryGoodsPanel";
import axios from "axios";
import {CategoryNode} from "../utils/utils";


afterEach(() => {
    cleanup().then()
})

test('test format data functionality 1', () => {
    const data:CategoryGoods[] = []
    const { result } = renderHook(() => formatData(data))
    expect(result.current).toEqual([])
})

test('test format data functionality 2', () => {
    const data:CategoryGoods[] = [ { goods:[{id:1}], id:0, level:0, name:"test name", children:[] } ]
    const { result } = renderHook(() => formatData(data))
    expect(typeof result.current).toBe('object')
})

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('render category goods panel', async () => {
    mockedAxios.get.mockResolvedValueOnce({
        data: {"msg":"operate success","code":0,
            "data":
                [
                    {"id":1,"name":"meat","level":1,"children":
                            [
                                {"id":2,"name":"chicken","level":2,"children":
                                        [{"id":31,"name":"chicken wings","level":3,"children":[]}]
                                }
                            ]
                    },
                    {"id":3,"name":"vegetable","level":1, "children":
                            [
                                {"id":4,"name":"carrot","level":2,"children":
                                    [{"id":32,"name":"organic carrot","level":3,"children":[]}]
                                },
                                {"id":5,"name":"cabbage","level":2,"children":
                                        [{"id":33,"name":"organic cabbage","level":3,"children":[]}]
                                }
                            ]
                    },
                ]}
    }) // mock for get category Tree
    mockedAxios.get.mockResolvedValueOnce({data: { code:0, data:[{id:1}] }}) // mock for two categories
    mockedAxios.get.mockResolvedValueOnce({data: { code:0, data:[{id:2}] }}) // mock for two categories
    const { result, waitForNextUpdate } = await renderHook(() => CategoryGoodsPanel())
    const { data, componentDidMount, findLeaves } = result.current
    expect(data).toEqual([])
    await waitForNextUpdate()
    setTimeout(() => expect(data).toEqual([{id:1}, {id:2}]), 3000)

    mockedAxios.get.mockResolvedValueOnce({data:{code:1}})
    act(() => {componentDidMount()})
    setTimeout(() => expect(data).toEqual([]), 3000)

    const testLeaf: CategoryNode = {id:1, level:1, name:"test name", children:
            [{id:2, level:2, name:"test name 2", children:[]}]}
    act(() => {findLeaves(testLeaf)})
})

test('render category goods panel UI', () => {
    const { result } = renderHook(() => CategoryGoodsPanelUI())
})