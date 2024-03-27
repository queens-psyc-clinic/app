/*
This service handles all operations with Library tests and items
*/

import axios, { AxiosError, AxiosResponse } from "axios";
import { Test } from "../models/BEModels";
// Define the interface for the data returned by the API
interface testQuery {
  measure?: string;
  item?: string;
  age?: string;
}

export interface Item {
  Ages: string;
  ID: string;
  IsArchived: Number; //
  ItemName: string;
  ItemType: string;
  Location: string;
  NumberOfParts: string;
  Status: Number;
  Stock: Number;
  TestID: string;
}

export interface Loan {
  EndDate: string;
  ID: string;
  ItemID: string;
  StartDate: string;
  UserID: string;
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

export async function getItemsForTest(testAcronym: string) {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/items`,
      JSON.stringify({
        TestID: testAcronym,
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

export async function createNewItem(newItem: Item) {
  // Add new item

  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/createItem`,
      JSON.stringify(newItem),
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

export async function deleteItem(itemId: string) {
  // delete an item
  try {
    const response: AxiosResponse = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/item/${itemId}`
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

export async function getItemById(itemId: string) {
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/item/${itemId}`
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

export async function getAllSignedOutItems(userId?: string) {
  // If userId, then get all of that user's signed out tests
  // otherwise get all signed out tests (admin)
  // WAITING ON loan controller
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/loans`
    );

    const loans: Loan[] = response.data;
    let result = [];
    for (const loan of loans) {
      const item: Item = await getItemById(loan.ItemID);
      const test: Test = await getTestById(item.TestID);
      result.push({
        Name: test.Name,
        ItemName: item.ItemName,
        MeasureOf: test.MeasureOf,
        Acronym: item.ID,
        UserID: loan.UserID,
        StartDate: loan.StartDate,
        EndDate: loan.EndDate,
      });
    }
    return result;
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

export async function getAllArchivedTests() {
  // If userId, then get all of that user's signed out tests
  // otherwise get all signed out tests (admin)
  // WAITING ON isArchived to be added to tests
}

export async function getAllOverdueItems() {
  // If userId, then get all of that user's overdue out tests
  // otherwise get all overdue  tests (admin)
  try {
    const signedOutItems = await getAllSignedOutItems();
    const today = new Date();
    const result = [];
    for (const signedOutItem of signedOutItems) {
      const loanEnd = new Date(signedOutItem.EndDate);
      if (loanEnd < today) {
        result.push({
          ...signedOutItem,
          LastNotified: new Date().toString(), // WAITING ON lastNotified to be added to loans
        });
      }
    }

    // QUESTION: do we notify users here? I think it makes more sense to have a job that checks once a day
    return result;
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

export async function getAllOverdueTestsByUser(userId: string) {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/loans`,
      {
        UserID: userId,
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );
    const signedOutItems: Loan[] = response.data;
    const today = new Date();
    const result = [];
    for (const signedOutItem of signedOutItems) {
      const loanEnd = new Date(signedOutItem.EndDate);
      if (loanEnd < today) {
        result.push({
          ...signedOutItem,
          LastNotified: new Date().toString(), // WAITING ON lastNotified to be added to loans
        });
      }
    }

    return result;
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

export async function editTest(edits: {
  acronym: string;
  name?: string;
  measure?: string;
  level?: string;
  edition?: string;
  orderingCompany?: string;
}) {
  // Update a test's attributes
  let endpoint = `/test/${edits.acronym}?`;
  if (edits.name) {
    endpoint += `&Name=${edits.name}`;
  }
  if (edits.measure) {
    endpoint += `&MeasureOf=${edits.measure}`;
  }
  if (edits.level) {
    endpoint += `&LevelOfUser=${edits.level}`;
  }
  if (edits.edition) {
    endpoint += `&EditionNumber=${edits.edition}`;
  }
  if (edits.orderingCompany) {
    endpoint += `&OrderingCompany=${edits.orderingCompany}`;
  }

  try {
    const response: AxiosResponse = await axios.put(
      `${process.env.REACT_APP_BASE_URL}${endpoint}`
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
  // WAITING ON loan controller
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
  // WAITING ON loan controller
}

export async function isTestAvailable(testId: string, quantity: Number) {
  // Check if all items in the test are available in quantity
  try {
    // Get items related to that test
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/items`,
      JSON.stringify({
        TestID: testId,
      }),
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );
    const testItems = response.data;
    var unavailableItems = [];
    // Check if each item is available in at least the given quantity
    for (const item of testItems) {
      if (item.Stock < quantity) {
        unavailableItems.push(item);
      }
    }
    if (unavailableItems.length > 0) {
      return {
        isTestAvailable: false,
        payload: unavailableItems,
      };
    } else {
      return {
        isTestAvailable: true,
        payload: testItems,
      };
    }
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
