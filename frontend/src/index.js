import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Home} from "./pages/Home"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Signup} from "./pages/Signup";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path = "/" element={<Home />}></Route>
              <Route path = "/sign-up" element={<Signup />}></Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

