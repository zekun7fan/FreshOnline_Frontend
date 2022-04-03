import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import SearchPage, {SearchFooter} from "../pages/SearchPage";
import {Provider} from "react-redux";
import store from "../redux/store";
import {BrowserRouter} from "react-router-dom";

jest.mock('antd/es/tree-select', () => ({}));

test('render search page UI using hook', () => {
    const wrapper = ({children}: { children: any }) => (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
    const { result } = renderHook(() => SearchPage(), { wrapper })
    expect(result.current).toMatchSnapshot()
})

test('render search footer UI using hook', () => {
    const wrapper = ({children}: { children: any }) => (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
    const { result } = renderHook(() => SearchFooter(), { wrapper })
    expect(result.current).toMatchSnapshot()
})