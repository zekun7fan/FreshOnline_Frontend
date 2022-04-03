import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import SearchSider from "../components/SearchSider";
import SearchContent from "../components/SearchContent";
import SearchPage from "../pages/SearchPage";
import SearchHeaderUI from "../components/SearchHeader";
import store from "../redux/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

test('render search sider using hook', () => {
    const wrapper = ({ children }:{ children: any }) => (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
    const { result } = renderHook(() => SearchSider(), { wrapper })
    // console.log(result.current)
})

afterEach(cleanup)