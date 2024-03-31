import React, { useEffect } from "react";
import { Pages } from "../models/Pages";

const Redirect = ({ page }: { page: Pages }) => {
  useEffect(() => {
    switch (page) {
      case Pages.signin:
        window.location.href = "/sign-in";
    }
  });
  return <div></div>;
};

export default Redirect;
