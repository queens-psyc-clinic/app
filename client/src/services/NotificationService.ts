/*
This service handles Notifications
*/

import axios, { AxiosError, AxiosResponse } from "axios";
import { getItemNameById } from "./TestService";
import { Notification } from "../models/BEModels";
import { getUserSettingsData } from "./UserService";

// Define the interface for the data returned by the API
enum NotificationType {
  Overdue,
  LowStock,
}

export async function notify(recipientUserId: string, testId: string) {
  // Notify recipient based on the notification type (this is the native notifications on the website)
}

export async function sendNotificationEmail(
  recipientEmail: string,
  testId: string
) {
  // Send a notification email to the recipient about the specified test
}

export async function notifyUser(userId: string, itemId: string) {
  getItemNameById(itemId)
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
  const item = "testhi";
  let user = await getUserSettingsData(userId);
  const subject = "Overdue Item";
  const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Overdue Item Reminder</title><style>body{font-family:Arial, sans-serif;line-height:1.6;margin:0;padding:0;}.container{max-width:600px;margin:auto;padding:20px;border:1px solid #ccc;border-radius:5px;background-color:#f9f9f9;}</style></head><body><div class="container"><p>Hi ${user.FirstName},</p><p>This is just a friendly reminder that ${item} item is overdue. Please return the item to the clinic as soon as possible.</p><p>Thank you kindly,<br>Queen's Psychology Clinic</p></div></body></html>`;

  await axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/email/${userId}/${subject}/${user.Email}`,
      htmlContent,
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    )
    .catch((e) => console.log("error while emailing user"));
}

export async function getNotificationsByUser(userId: string) {
  // Get all notifications for a user

  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/notifications`,
      {
        UserID: userId,
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );
    const res = response.data.map((elem: Notification) => {
      const date = new Date(elem.NotificationDate);
      return {
        date: date.toDateString(),
        time: date.toLocaleTimeString(),
      };
    });

    for (let i = 0; i < response.data.length; i += 1) {
      res[i].itemName = await getItemNameById(response.data[i].ItemID);
    }

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const axiosError: AxiosError = error;

      if (axiosError.request) {
        // No response received
        console.error("No response received");
      } else {
        // Request never made (e.g., due to network error)
        console.error("Error making the request:", axiosError.message);
      }
    } else {
      // Non-Axios error
      console.error("Non-Axios error occurred:", error);
    }
    // Throw the error to be handled by the caller
    throw error;
  }
}
