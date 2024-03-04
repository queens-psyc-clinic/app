import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import { Role } from "./models/User";
import Dashboard from "./pages/Dashboard";

function App() {
  // Call service function that checks if user is client or admin, placeholder for now
  const userRole: Role = "client";

  return (
    <div className="flex h-screen w-screen p-2 items-center">
      <Navbar userType={userRole} />
      <Dashboard userRole={userRole} />
      <Notification userRole={userRole} />
    </div>
  );
}

export default App;
