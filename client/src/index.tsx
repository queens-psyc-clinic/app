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
    path: "/:type",
    element: <PrivateRoutes page={Pages.dashboard} />,
  },
  {
    path: "/:type/signed-out",
    element: <PrivateRoutes page={Pages.signedOut} />,
  },
  {
    path: "/:type/overdue",
    element: <PrivateRoutes page={Pages.overdue} />,
  },
  {
    path: "/:type/settings",
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
    path: "/:type/low-stock",
    element: <PrivateRoutes page={Pages.lowStock} />,
  },
  {
    path: "/:type/archive",
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
    path: "/sign-up/:type",
    element: <App page={Pages.signup} />,
  },
  {
    path: "/sign-in",
    element: <App page={Pages.signin} />,
  },
  {
    path: "/account-type",
    element: <AccountType onSignIn={() => console.log("hi")} />,
  },
  {
    path: "/:type/student",
    element: <PrivateRoutes page={Pages.student} />,
  },
  {
    path: "/:type/requests",
    element: <App page={Pages.requests} />,
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
