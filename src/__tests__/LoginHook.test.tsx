import { renderHook, act } from '@testing-library/react-hooks';

import SearchHeader from "../components/SearchHeader";
import Login from "../components/Login";
import {BrowserRouter} from "react-router-dom";


test('render login using hook', () =>{
    const re = renderHook(() => {
        return (
            <BrowserRouter>
                Login()
            </BrowserRouter>
        )
    })
    console.log(re)
    const { result } = re
    console.log(result)
    console.log(result.current)
})