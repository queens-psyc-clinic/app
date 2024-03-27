/*
This service handles authentication, and getting/ editing user information
*/

import axios, { AxiosResponse } from "axios";

// Define the interface for the data returned by the API
interface UserData {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export async function createNewAccount(
  email: string,
  username: string,
  password: string
) {
  // Check if there already exists an account with the email, can call authenticateAccount
  // Check if username is taken
  // Create new user
}

export async function authenticateAccount(email: string, password: string) {
  // Check if there already exists an account with the email
}

export async function getUserSettingsData(id: string) {
  // Get user's data for the settings page, we need:
  // the profile image (if there is one)
  // Name
  // password
  // whether they are subscribed to notifications or not
}

export async function changeUserPassword(
  userId: string,
  oldPassword: string,
  newPassword: string
) {}
