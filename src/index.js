import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./features/sign up/sign up";
import Privacy from "./features/sign up/PrivacySettings";
import RegistrationTags from "./features/Registration_Tags/RegistrationTags";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CssBaseline>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/Registration_Tags" element={<RegistrationTags />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </CssBaseline>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
