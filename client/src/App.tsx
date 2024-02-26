import { ReactComponentElement, ReactElement } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Role } from "./models/User";
import Dashboard from "./pages/Dashboard";
import SignedOut from "./pages/SignedOut";
import Overdue from "./pages/Overdue";
import LowStock from "./pages/LowStock";
import Archive from "./pages/Archive";
import Modal from "./components/Modal";


function App(props: {page: string}) {
  // Call service function that checks if user is client or admin, placeholder for now
  const userRole: Role = "admin";

  return (
    <>
    <div className="flex h-screen w-screen p-2 items-center">
      <Navbar userType={userRole} />
      {props.page === "dashboard" &&  <Dashboard/>}
      {props.page === "signed-out" &&  <SignedOut/>}
      {props.page === "overdue" &&  <Overdue/>}
      {props.page === "low-stock" &&  <LowStock/>}
      {props.page === "archive" &&  <Archive/>}
    </div>
    </>
  );

// export function App() {
//   return (
//     <div className="w-screen h-screen bg-white flex items-center px-4">
//       <Navbar />
//       <Modal modalTitle="Add Item" buttonLabel="Save" secButtonLabel="Cancel"/>
//     </div>
//   );
// }
  }

export default App;
