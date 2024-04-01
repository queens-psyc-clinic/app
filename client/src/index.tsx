import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Pages } from "./models/Pages";
import AccountType from "./pages/AccountType";
import PrivateRoutes from "./PrivateRoutes";
import Redirect from "./pages/Redirect";

const router = createBrowserRouter([
  {
    path: "/", // CHANGE THIS TO DIRECT TO SIGN IN PAGE
    element: <Redirect />,
  },
  {
    path: "/sign-up/:type",
    element: <App page={Pages.signup} />,
  },
  {
    path: "/sign-in",
    element: <App page={Pages.signin} />,
  },
  {
    path: "/",
    element: <PrivateRoutes page={Pages.dashboard} />,
  },
  {
    path: "/signed-out",
    element: <PrivateRoutes page={Pages.signedOut} />,
  },
  {
    path: "/overdue",
    element: <PrivateRoutes page={Pages.overdue} />,
  },
  {
    path: "/settings",
    element: <PrivateRoutes page={Pages.settings} />,
  },
  // {
  //   path: "/admin",
  //   element: <PrivateRoutes page={Pages.dashboard} userRole="admin" />,
  // },
  // {
  //   path: "/admin/signed-out",
  //   element: <PrivateRoutes page={Pages.signedOut} userRole="admin" />,
  // },
  // {
  //   path: "/admin/overdue",
  //   element: <PrivateRoutes page={Pages.overdue} userRole="admin" />,
  // },
  {
    path: "/low-stock",
    element: <PrivateRoutes page={Pages.lowStock} />,
  },
  {
    path: "/archive",
    element: <PrivateRoutes page={Pages.archive} />,
  },
  // {
  //   path: "/client/archive",
  //   element: <PrivateRoutes page={Pages.archive} userRole="client" />,
  // },
  // {
  //   path: "/admin/settings",
  //   element: <PrivateRoutes page={Pages.settings} userRole="admin" />,
  // },
  {
    path: "/account-type",
    element: <AccountType onSignIn={() => console.log("hi")} />,
  },
  {
    path: "/student/:id",
    element: <PrivateRoutes page={Pages.student} />,
  },
  {
    path: "/requests",
    element: <PrivateRoutes page={Pages.requests} />,
  },
  {
    path: "/admin/accounts",
    element: <App page={Pages.accounts} userRole="admin" />,
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
