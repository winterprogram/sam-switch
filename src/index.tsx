import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Wrapper } from "./components/Admin";
import { Main } from "./Main";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App/App";
import ReactGA from "react-ga";

ReactGA.initialize("UA-243566143-1");
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Main />
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
