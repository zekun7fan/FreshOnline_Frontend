import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import SearchHeader from "../components/SearchHeader";
import LoginUI from "../components/Login";
import {BrowserRouter} from "react-router-dom";
import {Login} from "../components/Login";
import {Provider} from "react-redux";
import store from "../redux/store";



jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useRouteMatch: () => ({ url: '/toLogin' }),
}));

test('render login using hook', () =>{
    const wrapper = ({ children }:{ children: any }) => (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
    const { result } = renderHook(() => Login(), { wrapper })

    console.log(result.current)
})

test('render loginUI using hook', () =>{
    const wrapper = ({ children }:{ children: any }) => (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )

    const { result } = renderHook(() => LoginUI(), { wrapper })
    console.log(result)
})

afterEach(cleanup)