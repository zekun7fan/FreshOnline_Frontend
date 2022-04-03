import {sum} from "../example/testExample/testExample";
import ReactDOM, {render, unmountComponentAtNode} from "react-dom";
import {BrowserRouter, Router} from 'react-router-dom'
import {act} from "react-dom/test-utils";
import LoginUI from "../components/Login";
import {Provider} from "react-redux";
import store from "../redux/store";
import App from "../App";
import React, {ReactChild, ReactNode} from "react";
import {cleanup} from "@testing-library/react-hooks";

afterEach(() => {
    cleanup().then()
})

it('1 + 1 = 2', () => {
    expect(sum(1, 1)).toBe(2);
});

// const e1 = (<Provider store={store}>
//     <BrowserRouter>
//         <div id={"testRoot"}/>
//     </BrowserRouter>
// </Provider>)
//
//
// const g = document.createElement('div');
// g.setAttribute("id", "testRoot");


// ReactDOM.render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <div id={"testRoot"}/>
//         </BrowserRouter>
//     </Provider>,
//     document.getElementById('root')
// );



// let container = document.getElementById("testRoot")
// beforeEach(() => {
//     // setup a DOM element as a render target
//
// });
//
//
// afterEach(() => {
//     // cleanup on exiting
//     unmountComponentAtNode(container!);
// });

// it("renders with or without a name", () => {
//     act(() => {
//         render(<Login />, container);
//     });
// });