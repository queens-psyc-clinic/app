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
import Requests from "./pages/Requests";
import {
  archiveTest,
  createNewTest,
  getAllArchivedTests,
  getLowStockItems,
} from "./services/TestService";
import PrivateRoutes from "./PrivateRoutes";
import {
  authenticateAccount,
  createNewAccount,
  getSessionId,
  getUserSettingsData,
  initializeUserSession,
  isUserSignedIn,
  logOut,
  setUserAsAdmin,
} from "./services/UserService";

interface AppProps {
  page: Pages;
  userRole: Role;
}

function App({ page }: AppProps) {
  // Call service function that checks if user is client or admin, placeholder for now
  const [isSignedIn, setIsSignedIn] = useState<boolean>(); // Toggle to show sign-in/out vs other pages!!
  const [role, setRole] = useState<Role>();
  useEffect(() => {
    if (isUserSignedIn()) {
      setIsSignedIn(true);
      const user = getSessionId();
      if (user) {
        getUserSettingsData(user).then((res) =>
          setRole(res.IsAdmin ? "admin" : "client")
        );
      }
    }
  }, []);

  async function handleSignIn(email: string, password: string) {
    const user = await authenticateAccount(email, password).catch((e) => {
      if (e.message == "Account not confirmed") {
        alert("Sorry, your account has not been confirmed by the clinic Administrator yet.")
      } else {
        alert("Email or password is incorrect");
      }
      window.location.reload();
    });
    if (user) {
      initializeUserSession(user.ID);
      window.location.href = "/";
    }
  }

  async function handleSignUp(info: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
  }) {
    const user = await createNewAccount(
      info.firstName,
      info.lastName,
      info.email,
      info.password
    ).catch((e) => {
      console.log(e.message);
      if (e.message == "Email already exists") {
        alert(
          "This email is already associated with an account. Try signing in."
        );
      } else {
        alert("There was an error creating your account");
      }
    });
    if (info.isAdmin) {
      await setUserAsAdmin(user?.ID);
    }
    alert("Account created successfully!");
    window.location.href = "/sign-in";
  }

  if (isSignedIn) {
    return <PrivateRoutes page={Pages.dashboard} />;
  } else {
    return (
      <div className="flex h-screen w-screen p-2 items-center">
        <>
          {page === Pages.accounttype && <AccountType />}
          {page === Pages.signin && <SignIn onSignIn={handleSignIn} />}
          {page === Pages.signup && <SignUp onSignUp={handleSignUp} />}
        </>
      </div>
    );
  }
}

App.defaultProps = {
  userRole: "client",
  page: Pages.dashboard,
};

export default App;
