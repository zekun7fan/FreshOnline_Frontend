import { renderHook, act } from '@testing-library/react-hooks';

import SearchHeader from "../components/SearchHeader";
import Login from "../components/Login";
import {BrowserRouter} from "react-router-dom";


test('render login using hook', () =>{
    const { result } = renderHook(() => {
        return (
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )
    })
    // console.log(result.current)
    // console.log(result.current.props.children)
})