/*
This service handles authentication, and getting/ editing user information
*/

import axios, { AxiosError, AxiosResponse } from "axios";
import { UserSettings } from "../models/BEModels";

export type BackendUser = {
  ID: string;
  FirstName: string;
  LastName: string;
  Email: string;
  IsAdmin: boolean;
};

class InvalidEntry extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidEntry";
  }
}

export async function createNewAccount(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  /**
   * Create new user account
   *
   * @param firstName
   * @param lastName
   * @param email
   * @param password
   * @returns The new user account object
   * @throws {InvalidEntry} If the email already exists.
   */
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/${email}/${password}?FirstName=${firstName}&LastName=${lastName}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        // Server responded with an error status code (4xx or 5xx)

        if (axiosError.response.status === 409) {
          throw new InvalidEntry("Email already exists");
        }
      } else if (axiosError.request) {
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

export async function authenticateAccount(email: string, password: string) {
  /**
   * Authenticate existing user account
   * @param email
   * @param password
   * @returns The new user account object
   * @throws {InvalidEntry} If the wrong password is inputted.
   */

  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/${email}/${password}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        // Server responded with an error status code (4xx or 5xx)

        if (axiosError.response.status === 400) {
          throw new InvalidEntry("Incorrect Password.");
        }
      } else if (axiosError.request) {
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

export async function getUserSettingsData(id: string) {
  /**
   * Get the user's settings data
   * @param id
   * @returns The user's account object, includes name, email, whether
   *          they are subscribed to notifications, etc.
   * @throws {InvalidEntry} If the wrong password is inputted.
   * @note I haven't implemented the uploading and retrieving of profile pictures
   */

  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/${id}`
    );
    const users = response.data;
    const user = users.filter((user: BackendUser) => user.ID === id);
    return user[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        // Server responded with an error status code (4xx or 5xx)

        if (axiosError.response.status === 400) {
          throw new InvalidEntry("Incorrect Password.");
        }
      } else if (axiosError.request) {
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

export async function updateUserSettings(updatedSettings: UserSettings) {
  /**
   * Update's users settings data
   */

  try {
    const response: AxiosResponse = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/users/${updatedSettings.ID}`,
      {
        filters: {
          ID: updatedSettings.ID,
        },
        update: {
          ...updatedSettings,
          IsAdmin: undefined,
          ID: undefined,
        },
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        // Server responded with an error status code (4xx or 5xx)

        if (axiosError.response.status === 400) {
          throw new InvalidEntry("Incorrect Password.");
        }
      } else if (axiosError.request) {
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

export async function setUserAsAdmin(userId: string) {
  /**
   * Update's users settings data
   */

  try {
    const response: AxiosResponse = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
      {
        filters: {
          ID: userId,
        },
        update: {
          IsAdmin: true,
        },
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        // Server responded with an error status code (4xx or 5xx)

        if (axiosError.response.status === 400) {
          throw new InvalidEntry("Incorrect Password.");
        }
      } else if (axiosError.request) {
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

export async function changeUserPassword(
  id: string,
  oldPassword: string,
  newPassword: string
) {
  // WAITING ON change password
  /**
   * Changes the user's password
   * @param id
   * @param oldPassword
   * @param newPassword
   * @returns
   * @throws {}
   * @note Not implemented yet
   */
}

export function initializeUserSession(userId: string) {
  localStorage.setItem("session", userId);
}

export function isUserSignedIn() {
  const user = localStorage.getItem("session");
  return user;
}

export function getSessionId() {
  return localStorage.getItem("session");
}

export function logOut() {
  localStorage.removeItem("session");
}
