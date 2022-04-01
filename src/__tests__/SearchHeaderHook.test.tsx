import { renderHook, act } from '@testing-library/react-hooks';

import SearchHeader from "../components/SearchHeader";
import Login from "../components/Login";


test('render login using hook', () =>{
    const { result } = renderHook(() => SearchHeader())
    console.log(result.current)
})