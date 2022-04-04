import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import SearchSiderUI, {SearchSider} from "../components/SearchSider";
import SearchContentUI from "../components/SearchContent";
import SearchPage from "../pages/SearchPage";
import SearchHeaderUI from "../components/SearchHeader";
import store from "../redux/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

jest.mock('antd/es/tree-select', () => ({}));

afterEach(() => {
    cleanup().then()
})

test('render search sider using hook', () => {
    const wrapper = ({ children }:{ children: any }) => (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
    const { result } = renderHook(() => SearchSider(), { wrapper })
    // console.log(result.current)
})

test('render search sider UI using hook', () => {
    const wrapper = ({ children }:{ children: any }) => (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
    const { result } = renderHook(() => SearchSiderUI(), { wrapper })
    expect(result.current.props.children.length).toEqual(3)
    expect(typeof result.current.props.children[0].type).toBe('function')
    expect(typeof result.current.props.children[1].type).toBe('function')
    expect(typeof result.current.props.children[2].type).toBe('object')
    expect(result.current).toMatchSnapshot()
})