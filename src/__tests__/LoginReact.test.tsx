import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SearchHeader from "../components/SearchHeader";
import Login from "../components/Login";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import App from "../App";


let container:any = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("render login", () => {
    act(() => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </BrowserRouter>,
            container);
    });
    console.log(container.textContent)
})