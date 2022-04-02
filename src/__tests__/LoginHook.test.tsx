import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import SearchHeader from "../components/SearchHeader";
import LoginUI from "../components/Login";
import {BrowserRouter} from "react-router-dom";
import {Login} from "../components/Login";


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