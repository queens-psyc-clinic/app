import { Pages } from "../models/Pages";

export function getCurrentPageFromUrl(relativeUrl: string): Pages {
  const subdirectories = relativeUrl.split("/");
  const page = subdirectories[subdirectories.length - 1];
  switch (page) {
    case "signed-out":
      return Pages.signedOut;
    case "overdue":
      return Pages.overdue;
    case "low-stock":
      return Pages.lowStock;
    case "archive":
      return Pages.archive;
    case "client":
      return Pages.dashboard;
    case "admin":
      return Pages.dashboard;
    case "sign-up":
      return Pages.signup;
    case "sign-in":
      return Pages.signin;
    case "account-type":
      return Pages.accounttype;
    case "requests":
      return Pages.requests;
  }
  return Pages.dashboard;
}
