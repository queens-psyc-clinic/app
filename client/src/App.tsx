import React from "react";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import { Role } from "./models/User";
import Archive from "./pages/Archive";
import Dashboard from "./pages/Dashboard";
import LowStock from "./pages/LowStock";
import Overdue from "./pages/Overdue";
import SignedOut from "./pages/SignedOut";
import { Pages } from "./models/Pages";
import Settings from "./pages/Settings";
import Cart from "./components/Cart";

interface AppProps {
  page: Pages;
  userRole: Role;
}

function App({ page, userRole }: AppProps) {
  // Call service function that checks if user is client or admin, placeholder for now
  return (
    <div className="flex h-screen w-screen p-2 items-center">
      <Navbar userType={userRole} />
      {page === Pages.dashboard && <Dashboard userRole={userRole} />}
      {page === Pages.overdue && <Overdue userRole={userRole} />}
      {page === Pages.signedOut && <SignedOut userRole={userRole} />}
      {page === Pages.archive && <Archive userRole={userRole} />}
      {page === Pages.lowStock && <LowStock userRole={userRole} />}
      {page === Pages.settings && <Settings userRole={userRole} />}
      {userRole === "client" && (
        <section className="flex absolute top-4 right-4">
          <Cart userRole={userRole} />
          <div className="w-6"></div>
          <Notification userRole={userRole} />
        </section>
      )}
      {userRole === "admin" && (
        <section className="absolute top-4 right-4">
          <Notification userRole={userRole} />
        </section>
      )}
    </div>
  );
}

App.defaultProps = {
  userRole: "client",
  page: Pages.dashboard,
};
export default App;
