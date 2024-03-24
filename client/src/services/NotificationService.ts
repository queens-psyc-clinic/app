/*
This service handles Notifications
*/

import axios, { AxiosResponse } from "axios";

// Define the interface for the data returned by the API
enum NotificationType {
  Overdue,
  LowStock,
}

export async function unsubscribeEmailNotifications(userId: string) {
  // User unsubscribes from receiving email notifications
}

export async function subscribeEmailNotifications(userId: string) {
  // User subscribes to receiving email notifications
}

export async function notify(
  notificationType: NotificationType,
  recipientUserId: string,
  testId: string
) {
  // Notify recipient based on the notification type (this is the native notifications on the website)
}

export async function sendNotificationEmail(
  recipientEmail: string,
  notificationType: NotificationType,
  testId: string
) {
  // Send a notification email to the recipient about the specified test
}

export async function getNotifications(userId: string) {
  // Get all notifications for a user
}
