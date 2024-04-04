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
import Accounts from "./pages/Accounts";

interface AppProps {
  page: Pages;
}

function PrivateRoutes({ page }: AppProps) {
  // Call service function that checks if user is client or admin, placeholder for now

  const [isPermitted, setIsPermitted] = useState(true);
  const [role, setRole] = useState<Role>();
  useEffect(() => {
    if (!isUserSignedIn()) {
      setIsSignedIn(false);
      window.location.href = "/sign-in";
    } else {
      getUserSettingsData(getSessionId() || "").then((res) => {
        setRole(res.IsAdmin ? "admin" : "client");
      });
    }
  }, []);
  const [isSignedIn, setIsSignedIn] = useState(true); // Toggle to show sign-in/out vs other pages!!
  return (
    <div className="flex h-screen w-screen p-2 items-center">
      {!isPermitted && <PageNotFound />}
      {isSignedIn && isPermitted && (
        <>
          <Navbar userType={role} />
          {page === Pages.dashboard && <Dashboard userRole={role!} />}
          {page === Pages.overdue && <Overdue userRole={role!} />}
          {page === Pages.signedOut && <SignedOut userRole={role!} />}
          {page === Pages.archive && <Archive userRole={role!} />}
          {page === Pages.lowStock && <LowStock userRole={role!} />}
          {page === Pages.settings && <Settings userRole={role!} />}
          {page === Pages.student && <StudentPage userRole={role!} />}
          {page === Pages.requests && <Requests userRole={role!} />}
          {page === Pages.accounts && <Accounts userRole={role!} />}
          {role === "client" && (
            <>
              <section className="flex flex-row absolute top-10 right-10">
                <Cart userRole={role!} />
                <div className="w-6"></div>
                <Notification userRole={role!} />
              </section>
            </>
          )}
          {role === "admin" && (
            <>
              <section className="flex flex-row absolute top-10 right-10">
                {/* <Cart userRole={userRole} />
                <div className="w-6"></div> */}
                <Notification userRole={role!} />
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}

PrivateRoutes.defaultProps = {
  page: Pages.dashboard,
};

export default PrivateRoutes;
