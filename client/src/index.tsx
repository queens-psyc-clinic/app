import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Pages } from "./models/Pages";

const router = createBrowserRouter([
  {
    path: "/", // CHANGE THIS TO DIRECT TO SIGN IN PAGE
    element: <App />,
  },
  {
    path: "/client",
    element: <App page={Pages.dashboard} userRole="client" />,
  },
  {
    path: "/client/signed-out",
    element: <App page={Pages.signedOut} userRole="client" />,
  },
  {
    path: "/client/overdue",
    element: <App page={Pages.overdue} userRole="client" />,
  },
  {
    path: "/client/settings",
    element: <App page={Pages.settings} userRole="client" />,
  },
  {
    path: "/admin",
    element: <App page={Pages.dashboard} userRole="admin" />,
  },
  {
    path: "/admin/signed-out",
    element: <App page={Pages.signedOut} userRole="admin" />,
  },
  {
    path: "/admin/overdue",
    element: <App page={Pages.overdue} userRole="admin" />,
  },
  {
    path: "/admin/low-stock",
    element: <App page={Pages.lowStock} userRole="admin" />,
  },
  {
    path: "/admin/archive",
    element: <App page={Pages.archive} userRole="admin" />,
  },
  {
    path: "/client/archive",
    element: <App page={Pages.archive} userRole="client" />,
  },
  {
    path: "/admin/settings",
    element: <App page={Pages.settings} userRole="admin" />,
  },
  {
    path: "/sign-up",
    element: <App page={Pages.signup} />,
  },
  {
    path: "/sign-in",
    element: <App page={Pages.signin} />,
  },
  {
    path: "/account-type",
    element: <App page={Pages.accounttype} />,
  },
  {
    path: "/admin/student",
    element: <App page={Pages.student} userRole="admin" />,
  },
  {
    path: "/admin/requests",
    element: <App page={Pages.requests} userRole="admin" />,
  },
  // ADD NEW PATHS HERE
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
