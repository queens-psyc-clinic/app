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

export async function createNewTest(newTest: Test) {
  // Add new Test
}

export async function createNewItem(newItem: LibraryItem) {
  // Add new item
}

export async function deleteItem(itemId: string) {
  // delete an item
}

export async function deleteTest(testId: string) {
  // delete a test
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
}

export async function getAllSignedOutTests(userId?: string) {
  // If userId, then get all of that user's signed out tests
  // otherwise get all signed out tests (admin)
}

export async function getAllArchivedTests() {
  // If userId, then get all of that user's signed out tests
  // otherwise get all signed out tests (admin)
}

export async function getAllOverdueTests(userId?: string) {
  // If userId, then get all of that user's overdue out tests
  // otherwise get all overdue  tests (admin)
}

export async function editTest(testId: string, updatedTest: Test) {
  // Update a test's attributes
}

export async function markOverdueTestAsGone(testId: string) {
  // Delete Overdue test
}

export async function markTestAsReserved(
  testId: string,
  recipientUserId: string
) {
  // Mark items as reserved for pickup
}

export async function markTestAsSignedOut(
  testId: string,
  recipientUserId: string
) {
  // When a reserved test is picked up by the client that reserved it, it should be marked as officially signed out
}

export async function unArchiveTest(testId: string) {
  // Unarchive a test
}

export async function archiveTest(testId: string) {
  // Archive a test
}

export async function markTestAsAvailable(testId: string) {
  // When clients return a test, admin should be able to mark the test as returned and now available
}

export async function isTestAvailable(testId: string, quantity: Number) {}
