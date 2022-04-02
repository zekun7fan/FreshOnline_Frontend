import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import SearchHeader from "../components/SearchHeader";
import LoginUI from "../components/Login";
import {BrowserRouter} from "react-router-dom";
import login from "../components/Login";


test('render login using hook', () =>{
    const { result } = renderHook(() => login())

    console.log(result.current)
    // don't touch result.current, then it succeeds

    cleanup()
})