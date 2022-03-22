import React from 'react';
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";

import PaymentMethodPanel from "./components/PaymentMethodPanel";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Register/>
    </div>
  );
}

export default App;
