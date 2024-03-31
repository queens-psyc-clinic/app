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
import { isUserSignedIn, logOut } from "./services/UserService";

interface AppProps {
  page: Pages;
  userRole: Role;
}

function PrivateRoutes({ page, userRole }: AppProps) {
  // Call service function that checks if user is client or admin, placeholder for now
  useEffect(() => {
    console.log(isUserSignedIn());
    if (!isUserSignedIn()) {
      setIsSignedIn(false);
      console.log("girl");
      window.location.href = "/sign-in";
    }
  }, []);
  const [isSignedIn, setIsSignedIn] = useState(true); // Toggle to show sign-in/out vs other pages!!
  const handleSignIn = () => {
    setIsSignedIn(true);
  };
  console.log(page, userRole);
  return (
    <div className="flex h-screen w-screen p-2 items-center">
      {isSignedIn && (
        <>
          <Navbar userType={userRole} />
          {page === Pages.dashboard && <Dashboard userRole={userRole} />}
          {page === Pages.overdue && <Overdue userRole={userRole} />}
          {page === Pages.signedOut && <SignedOut userRole={userRole} />}
          {page === Pages.archive && <Archive userRole={userRole} />}
          {page === Pages.lowStock && <LowStock userRole={userRole} />}
          {page === Pages.settings && <Settings userRole={userRole} />}
          {page === Pages.student && <StudentPage userRole={userRole} />}
          {page === Pages.requests && <Requests userRole={userRole} />}
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
      {!isSignedIn && <></>}
    </div>
  );
}

PrivateRoutes.defaultProps = {
  userRole: "client",
  page: Pages.dashboard,
};

export default PrivateRoutes;
