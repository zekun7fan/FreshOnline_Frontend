import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import SearchContentUI, {SearchContent} from "../components/SearchContent";
import {Provider} from "react-redux";
import store from "../redux/store";
import {BrowserRouter} from "react-router-dom";

jest.mock('antd/es/tree-select', () => ({}));

afterEach(() => {
    cleanup().then()
})

test('render search content using hook', () => {
    const wrapper = ({ children }:{ children: any }) => (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
    const { result } = renderHook(() => SearchContent(), { wrapper })
    const { search_results, onChange } = result.current
    act(() => onChange(1))
    expect(search_results).toEqual([])
})

test('render search content UI using hook', () => {
    const wrapper = ({ children }:{ children: any }) => (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
    const { result } = renderHook(() => SearchContentUI(), { wrapper })
    expect(result.current).toMatchSnapshot()
})