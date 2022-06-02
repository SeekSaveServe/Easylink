import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
// Sentry
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { ReactDOM } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./features/sign up/sign up";
import Privacy from "./features/sign up/PrivacySettings";
import RegistrationTags from "./features/Registration_Tags/RegistrationTags";
import ProtectedRoute from "./components/ProtectedRoute";
import Feed from "./features/feed";
import Profile from "./features/Profile/Profile";
import Projects from "./features/Projects";
import Links from "./features/Links";
import SearchPage from "./features/SearchPage";
import Settings from "./features/Profile/Settings/Settings";
import PrivacySettings from "./features/Profile/Privacy/Privacy";

const container = document.getElementById("root");
const root = createRoot(container);

// Setting up logger
Sentry.init({
  dsn: "https://2259a23501ee4699950c8f3cfc0901a1@o1268981.ingest.sentry.io/6458401",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

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
            <Route
              path="/feed"
              element={
                <ProtectedRoute redirectRoute="/">
                  {" "}
                  <Feed />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/Profile"
              element={
                <ProtectedRoute redirectRoute="/">
                  {" "}
                  <Profile />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <ProtectedRoute redirectRoute="/">
                  {" "}
                  <Projects />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/links"
              element={
                <ProtectedRoute redirectRoute="/">
                  {" "}
                  <Links />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/Search"
              element={
                <ProtectedRoute redirectRoute="/">
                  {" "}
                  <SearchPage />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/Settings"
              element={
                <ProtectedRoute redirectRoute="/">
                  {" "}
                  <Settings />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/PrivacySettings"
              element={
                <ProtectedRoute redirectRoute="/">
                  {" "}
                  <PrivacySettings />{" "}
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </CssBaseline>
  </React.StrictMode>
);

// ReactDOM.render(<App />, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
