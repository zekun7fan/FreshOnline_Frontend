import React from 'react';
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";

import PaymentMethodPanel from "./components/PaymentMethodPanel";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./example/funcExample/Main";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <div className="App">
      <AdminPanel/>
    </div>
  );
}

export default App;
