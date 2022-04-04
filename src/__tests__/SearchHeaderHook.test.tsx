import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import SearchHeaderUI, {onQuery, parseCategoryTree, SearchHeader} from "../components/SearchHeader";
import {BrowserRouter} from "react-router-dom";
import store from "../redux/store";
import {Provider} from "react-redux";
import {AdminSearchParam} from "../net/reqParam";
import {jest} from "@jest/globals";
import axios from "axios";

jest.mock('antd/es/tree-select', () => ({}));

let mock:any;
// beforeAll(() => {
//     mock = new MockAdapter(axios);
// });

afterEach(() => {
    // mock.reset()
    cleanup().then()
})

test('test parse category tree', () => {
    const tree = [{"id":1,"name":"meat","level":1,"children":[]}]
    const { result } = renderHook(() => parseCategoryTree(tree))
    expect(result.current).toEqual([{"id":1,"name":"meat","level":1,"children":[], "value":1, "label":"meat"}])
})

test('render onQuery', async () => {
    const empty_search_params: AdminSearchParam = {
        category_id: [],
        keyword: '',
        brands: [],
        price_low: 0,
        price_high: 0,
        sort_type: 0,
        page: 1
    }
    // mock.onGet('^/goods?').reply(200, {data: {code:0, msg:"hello", data:[]}})
    // ({data: {code:0, msg:"hello", data:[]}})
    const { result } = renderHook(() => onQuery(empty_search_params))

})

test('render search header using hook', async () =>{
    const wrapper = ({ children }:{ children: any }) => (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )

    const { result } = renderHook(() => SearchHeader(), { wrapper })
    const { category_tree, setCategoryTree, onChangeCategory,
        keyword, setKeyword, onChangeKeyword } = result.current

    act(() => setKeyword("meat"))
    act(() => onChangeKeyword())
    setTimeout(() => expect(keyword).toEqual("meat"), 3000)
    act(() => setCategoryTree([{"id":1,"name":"meat","level":1,"children":[]}]))
    setTimeout(() => expect(category_tree).toEqual([{"id":1,"name":"meat","level":1,"children":[]}]), 3000)
    act(() => onChangeCategory([1]))
    act(() => onChangeCategory(undefined))
})

test('render search header UI using hook', () =>{
    const wrapper = ({ children }:{ children: any }) => (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
    const { result } = renderHook(() => SearchHeaderUI(), { wrapper })
    // expect(result.current).toMatchSnapshot()
    expect(result.current.type).toBe('div')
})