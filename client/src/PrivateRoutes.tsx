import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import { Role } from "./models/User";
import Archive from "./pages/Archive";
import Dashboard from "./pages/Dashboard";
import LowStock from "./pages/LowStock";
import Overdue from "./pages/Overdue";
import { Pages } from "./models/Pages";
import Settings from "./pages/Settings";
import Cart from "./components/Cart";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AccountType from "./pages/AccountType";
import StudentPage from "./pages/StudentPage";
import SignedOut from "./pages/SignedOut";
import Requests from "./pages/Requests";
import {
  getSessionId,
  getUserSettingsData,
  isUserSignedIn,
  logOut,
} from "./services/UserService";
import { useParams } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";

interface AppProps {
  page: Pages;
  userRole?: Role;
}

function PrivateRoutes({ page, userRole }: AppProps) {
  // Call service function that checks if user is client or admin, placeholder for now
  const { type } = useParams();
  const [isPermitted, setIsPermitted] = useState(false);

  console.log(type);
  useEffect(() => {
    if (!isUserSignedIn()) {
      setIsSignedIn(false);
      window.location.href = "/sign-in";
    } else {
      getUserSettingsData(getSessionId() || "").then((res) => {
        if (type == "admin") {
          if (res.IsAdmin) {
            setIsPermitted(true);
          } else {
            setIsPermitted(false);
          }
        } else {
          if (res.IsAdmin) {
            setIsPermitted(false);
          } else {
            setIsPermitted(true);
          }
        }
      });
    }
  }, []);
  const [isSignedIn, setIsSignedIn] = useState(true); // Toggle to show sign-in/out vs other pages!!

  console.log(page, userRole);
  return (
    <div className="flex h-screen w-screen p-2 items-center">
      {!isPermitted && <PageNotFound />}
      {isSignedIn && isPermitted && (
        <>
          <Navbar userType={userRole} />
          {page === Pages.dashboard && (
            <Dashboard userRole={userRole || (type as Role)} />
          )}
          {page === Pages.overdue && (
            <Overdue userRole={userRole || (type as Role)} />
          )}
          {page === Pages.signedOut && (
            <SignedOut userRole={userRole || (type as Role)} />
          )}
          {page === Pages.archive && (
            <Archive userRole={userRole || (type as Role)} />
          )}
          {page === Pages.lowStock && (
            <LowStock userRole={userRole || (type as Role)} />
          )}
          {page === Pages.settings && (
            <Settings userRole={userRole || (type as Role)} />
          )}
          {page === Pages.student && (
            <StudentPage userRole={userRole || (type as Role)} />
          )}
          {page === Pages.requests && (
            <Requests userRole={userRole || (type as Role)} />
          )}
          {userRole === "client" && (
            <>
              <section className="flex flex-row absolute top-10 right-10">
                <Cart userRole={userRole} />
                <div className="w-6"></div>
                <Notification userRole={userRole} />
              </section>
            </>
          )}
          {userRole === "admin" && (
            <>
              <section className="flex flex-row absolute top-10 right-10">
                {/* <Cart userRole={userRole} />
                <div className="w-6"></div> */}
                <Notification userRole={userRole} />
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}

PrivateRoutes.defaultProps = {
  userRole: "client",
  page: Pages.dashboard,
};

export default PrivateRoutes;
