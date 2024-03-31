import React, { useEffect, useState } from "react";
import { Pages } from "../models/Pages";
import { getUserSettingsData, isUserSignedIn } from "../services/UserService";
import PrivateRoutes from "../PrivateRoutes";
import { Role } from "../models/User";
import App from "../App";

const Redirect = () => {
  const user = isUserSignedIn();
  const [role, setRole] = useState<Role>();
  if (user) {
    getUserSettingsData(user).then((res) =>
      setRole(res.IsAdmin ? "admin" : "client")
    );
    return <PrivateRoutes page={Pages.dashboard} userRole={role} />;
  } else {
    window.location.href = "/sign-in";
    return <App page={Pages.signin} />;
  }
};

export default Redirect;
