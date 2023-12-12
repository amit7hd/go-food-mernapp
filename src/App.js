import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap css
import 'bootstrap/dist/js/bootstrap.bundle.min.js';    // bootstrap javascript
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'; // Bootstrap Dark CSS  



import "./App.css";
import Home from "./Screens/Home";  //importing Home
import Login from "./Screens/Login";   // importing Login
import Signup from './Screens/Signup'; // Importing signup component
import MyOrder from './Screens/MyOrder'; // Importing  MyOrder component
import { CartProvider } from './Components/ContextReducer';


import {       // importing react-router-dom
  // this is for react router dom
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {

  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/myOrder" element={<MyOrder/>} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
