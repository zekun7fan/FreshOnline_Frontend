import { renderHook, act } from '@testing-library/react-hooks';
import SearchHeader from "../components/SearchHeader";


test('render search header using hook', () =>{
    const { result } = renderHook(() => SearchHeader())
    console.log(result)
})