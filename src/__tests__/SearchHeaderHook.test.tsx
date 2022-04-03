import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import SearchHeaderUI, {SearchHeader} from "../components/SearchHeader";
import {BrowserRouter} from "react-router-dom";
import store from "../redux/store";
import {Provider} from "react-redux";
import exp from "constants";

jest.mock('antd/es/tree-select', () => ({}));

test('render search header using hook', () =>{
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

afterEach(cleanup)