import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import SearchHeader from "../components/SearchHeader";
import Login from "../components/Login";
import {BrowserRouter} from "react-router-dom";
import store from "../redux/store";
import {Provider} from "react-redux";


test('render searchheader using hook', () =>{
    const { result } = renderHook(() => {
        return (
            <Provider store={store}>
                SearchHeader()
            </Provider>
        )
    })
    console.log(result)
    console.log(result.current.props.children)
    expect(typeof result.current.props.store.dispatch).toBe('function')
    cleanup()
})