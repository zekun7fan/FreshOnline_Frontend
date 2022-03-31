import React from 'react';
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";

import PaymentMethodPanel from "./components/PaymentMethodPanel";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPanel from "./pages/AdminPanel";
import ExamplePanel from "./example/ExamplePanel";
import SearchPage from "./pages/SearchPage";
import WeeklySpeicalPanl from "./components/WeeklySpeicalPanl";
import Home from "./components/Home";



function App() {
  return (
    <div className="App">
      <AdminPanel/>
    </div>
  );
}

export default App;
