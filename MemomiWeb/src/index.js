import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import reportWebVitals from "./services/reportWebVitals";
import Focus from "./pages/FocusPage/Focus";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-cz8wroj02ik53vzv.us.auth0.com"
    clientId="2JtJXSwm3Z1xmi5JUua0tZpY7MBmFzU6"
    authorizationParams={{
      redirect_uri: window.Location.origin
    }}
  >
  <Focus />
  </Auth0Provider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
