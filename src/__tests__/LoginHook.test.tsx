import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import LoginUI from "../components/Login";
import {BrowserRouter} from "react-router-dom";
import {Login} from "../components/Login";
import {User} from "../net/reqBody";
import {jest} from "@jest/globals";
import axios from "axios";


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
    cleanup().then()
})

test('render login using hook', async () =>{
    const wrapper = ({ children }:{ children: any }) => (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
    const { result } = renderHook(() => Login(), { wrapper })
    // expect(result.current).toMatchSnapshot()
    const { localStorage, onFinish } = result.current

    mockedAxios.put.mockResolvedValueOnce({data: { code:1, msg:"hello", data: {}}})
    const user: User = {}
    await act(() => onFinish(user))
    expect(typeof localStorage).toBe('object')
    expect(localStorage.length).toEqual(0)

    await cleanup()

    mockedAxios.put.mockResolvedValueOnce({data: { code:0, msg:"hello", data: {}}})
    await act(() => onFinish(user))
    expect(typeof localStorage).toBe('object')
    expect(localStorage.length).toEqual(4)
})

test('render loginUI using hook', () =>{
    const wrapper = ({ children }:{ children: any }) => (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
    const { result } = renderHook(() => LoginUI(), { wrapper })
    // expect(result.current).toMatchSnapshot() 偷懒的做法 但是如果改前端 这个也会变化
    expect(result.current.props.children[0].props.children).toEqual('Login')
    expect(result.current.props.children[1].props.children.length).toEqual(3)
})

afterEach(cleanup)