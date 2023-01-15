import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
if(process.env.NODE_ENV ==="production"){
  console.log("inside production")
  window.API_URL = process.env.REACT_APP_API_URL
  console.log("api url ",window.API_URL)
}else{
  console.log("dev")
  window.API_URL = process.env.REACT_APP_API_URL
  console.log("api url ",window.API_URL)
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <App />
</BrowserRouter>
);

