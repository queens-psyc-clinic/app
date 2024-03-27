import React, { useState } from "react";
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

interface AppProps {
  page: Pages;
  userRole: Role;
}

function App({ page, userRole }: AppProps) {
  const [isSignedIn, setIsSignedIn] = useState(false); // Toggle to show sign-in/out vs other pages!!

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

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
          {userRole === "client" && (
            <section className="absolute top-4 right-4">
            <Cart userRole={userRole} />
            <div className="w-6"></div>
            <Notification userRole={userRole} />
            </section>
          )}
        </>
      )}
      {!isSignedIn && (
        <>
          {page === Pages.accounttype && <AccountType onSignIn={handleSignIn} />}
          {page === Pages.signin && <SignIn onSignIn={handleSignIn} />}
          {page === Pages.signup && <SignUp onSignIn={handleSignIn} />}
        </>
      )}
    </div>
  );
}

App.defaultProps = {
  userRole: "client",
  page: Pages.dashboard,
};

export default App;

