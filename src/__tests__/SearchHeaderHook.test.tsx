import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import SearchHeader from "../components/SearchHeader";
import {BrowserRouter} from "react-router-dom";
import store from "../redux/store";
import {Provider} from "react-redux";

test('render search header using hook', () =>{
    const wrapper = ({ children }:{ children: any }) => (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
    const { result } = renderHook(() => SearchHeader(), { wrapper })
    // expect(result.current).toMatchSnapshot()
})

afterEach(cleanup)