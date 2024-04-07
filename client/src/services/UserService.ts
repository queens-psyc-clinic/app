/*
This service handles authentication, and getting/ editing user information
*/

import axios, { AxiosError, AxiosResponse } from "axios";
import { UserSettings } from "../models/BEModels";
import uuid from "react-uuid";

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

export async function getAllUnapprovedUsers() {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/${getSessionId()}`,
      {
        IsAccepted: false,
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

export async function approveUser(userId: string) {
  try {
    const response: AxiosResponse = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/users/${getSessionId()}`,
      {
        filters: {
          ID: userId,
        },
        update: {
          IsAccepted: true,
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

export async function deleteUser(userId: string) {
  try {
    const userResponse: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/${getSessionId()}`,
      {
        ID: userId,
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );

    if (userResponse.data) {
      const user = userResponse.data[0];
      const response: AxiosResponse = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/user/${user.Email}/${user.ID}`
      );

      console.log(userResponse.data);
    }
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

export async function getUserByFirstLastName(firstLastName: string) {
  const [firstName, lastName] = firstLastName.split(" ");
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/${getSessionId()}`,
      JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
      }),
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

export async function changeUserPassword(email: string) {
  /**
   * Changes the user's password
   * @param id
   * @param oldPassword
   * @param newPassword
   * @returns
   * @throws {}
   */
  try {
    // Create temporary new user
    const tempEmail = `${uuid()}@temp.com`;
    const tempPassword = "password";
    const tempFirstName = "temp";
    const tempLastName = "temp";
    const tempUserResponse: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/${tempEmail}/${tempPassword}?FirstName=${tempFirstName}&LastName=${tempLastName}`
    );
    const tempUser = tempUserResponse.data;

    await setUserAsAdmin(tempUser.ID);

    // Check if given email exists, using tempUser's id
    const doesEmailExist: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/${tempUser.ID}`,
      {
        Email: email,
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );

    // If user email does not exist
    if (doesEmailExist.data.length == 0) {
      return false;
    }

    const user = doesEmailExist.data[0];

    // Generate a unique password
    const newUniquePassword = uuid();

    // Change user's password to the new unique password
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/users/${tempUser.ID}`,
        {
          filters: {
            ID: user.ID,
          },
          update: {
            Password: newUniquePassword,
          },
        },
        {
          headers: {
            "Content-Type": "application/json", // this shows the expected content type
          },
        }
      )
      .catch((e) =>
        console.log("error changing the user password to the temp password")
      );

    // Email this password to the user
    const subject = "Reset Account Password";

    const htmlContent = `<html><head><style>body {font-family: Arial, sans-serif;font-size: 14px;color: #333333;}.container {max-width: 600px;margin: 0 auto;padding: 20px;border: 1px solid #dddddd;border-radius: 5px;}h1 {color: #007bff;}.message {margin-top: 20px;} button {display: inline-block;background-color: #007bff;color: #ffffff;text-decoration: none;padding: 10px 20px;border-radius: 5px; outline: none; border: none;}</style></head><body><div class="container"><h1>Password Reset</h1><div class="message"><p>Hello,</p><p>We have received a request to reset your account password. Below is your temporary password:</p><p><strong>Temporary Password: </strong>${newUniquePassword}</p><p>Please log in using this temporary password and change your password immediately for security reasons.</p><button class="button">Log In Now</button></div></div></body></html>`;

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/email/${tempUser.ID}/${subject}/${user.Email}`,
        htmlContent,
        {
          headers: {
            "Content-Type": "application/json", // this shows the expected content type
          },
        }
      )
      .catch((e) => console.log("error emailing the temp password to user"));

    // Delete temp user
    await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/user/${tempEmail}/${tempUser.ID}`
      )
      .catch((e) => console.log("error deleting temp user"));

    return true;
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
