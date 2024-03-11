import { Pages } from "../models/Pages";

export function getCurrentPageFromUrl(relativeUrl: string): Pages {
  const subdirectories = relativeUrl.split("/");
  const page = subdirectories[subdirectories.length - 1];
  console.log(page);
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
  }
  return Pages.dashboard;
}