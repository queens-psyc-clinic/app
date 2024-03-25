/*
This service handles all operations with Library tests and items
*/

import axios, { AxiosError, AxiosResponse } from "axios";
import { Test, LibraryItem } from "../models/libraryItem";
import { columnCustomComponents } from "../models/tableColumns";
// Define the interface for the data returned by the API
interface testQuery {
  measure?: string;
  item?: string;
  age?: string;
}

export async function createNewTest(
  acronym: string,
  testName: string,
  measure: string,
  level: string,
  edition: string,
  orderingCompany: string
) {
  // Add new Test
  // WAITING ON: ages and status to be added to Tests db
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/test/${acronym}?LevelOfUser=${level}&EditionNumber=${edition}&Name=${testName}&MeasureOf=${measure}&OrderingCompany=${orderingCompany}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const axiosError: AxiosError = error;
      if (axiosError.status === 404) {
        console.log("DONT EXIST");
      }
      if (axiosError.response) {
        // Server responded with an error status code (4xx or 5xx)
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

export async function createNewItem(newItem: LibraryItem, forTest: Test) {
  // Add new item
  // WAITING ON item controller to be approved
}

export async function deleteItem(itemId: string) {
  // delete an item
  // WAITING ON item controller to be approved
}

export async function deleteTest(acronym: string) {
  // delete a test

  try {
    const response: AxiosResponse = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/test/${acronym}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const axiosError: AxiosError = error;
      if (axiosError.status === 404) {
        console.log("DONT EXIST");
      }
      if (axiosError.response) {
        // Server responded with an error status code (4xx or 5xx)
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

export async function getTestById(testId: string) {
  // Fetch a test by it's id
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/test/${testId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const axiosError: AxiosError = error;
      if (axiosError.status === 404) {
        console.log("DONT EXIST");
      }
      if (axiosError.response) {
        // Server responded with an error status code (4xx or 5xx)
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
// Acronym, name, measure, edition, ages, level
export async function getAllTests() {
  // Get all the tests in the database

  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/tests`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        // Server responded with an error status code (4xx or 5xx)
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

export async function getTestsByQuery(query: testQuery) {
  // If userId, then get all of that user's overdue out tests
  // otherwise get all overdue  tests (admin)
  // WAITING ON search query functionality in backend
}

export async function getAllSignedOutTests(userId?: string) {
  // If userId, then get all of that user's signed out tests
  // otherwise get all signed out tests (admin)
  // WAITING ON loan controller
}

export async function getAllArchivedTests() {
  // If userId, then get all of that user's signed out tests
  // otherwise get all signed out tests (admin)
  // WAITING ON isArchived to be added to tests
}

export async function getAllOverdueTests(userId?: string) {
  // If userId, then get all of that user's overdue out tests
  // otherwise get all overdue  tests (admin)
  // WAITING ON loan controller
}

export async function editTest(testId: string, updatedTest: Test) {
  // Update a test's attributes
}

export async function markOverdueTestAsGone(testId: string) {
  // Delete Overdue test
  // WAITING ON loan controller
}

export async function markTestAsReserved(
  testId: string,
  recipientUserId: string
) {
  // Mark items as reserved for pickup
  // temporarily lower stock of all items by 1
  // WAITING on when we decide how to implement reservations! there should be a backend API for a cron job i think
}

export async function markTestAsSignedOut(
  testId: string,
  recipientUserId: string
) {
  // When a reserved test is picked up by the client that reserved it, all items in test should have their quantities decremented by one
}

export async function unArchiveTest(testId: string) {
  // Unarchive a test
  // WAITING ON isArchived to be added to tests
}

export async function archiveTest(testId: string) {
  // Archive a test
  // WAITING ON isArchived to be added to tests
}

export async function markTestAsAvailable(testId: string) {
  // When clients return a test, admin should be able to mark the test as returned and now available
  // Increment quantities of all items in test
}

export async function isTestAvailable(testId: string, quantity: Number) {
  // Check if all items in the test are available in quantity
}
