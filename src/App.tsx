import React from 'react';
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";

import PaymentMethodPanel from "./components/PaymentMethodPanel";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./example/classExample/Main";
import ExamplePanel from "./example/ExamplePanel";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <div className="App">
      <SearchPage/>
    </div>
  );
}

export default App;
