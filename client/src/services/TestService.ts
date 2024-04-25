/*
This service handles all operations with Library tests and items
*/

import axios, { AxiosError, AxiosResponse } from "axios";
import { Test, Item } from "../models/BEModels";
import { Role } from "../models/User";
import { BackendUser, getSessionId, getUserSettingsData } from "./UserService";
import _ from "lodash";
// Define the interface for the data returned by the API
interface testQuery {
  measure?: string;
  item?: string;
  age?: string;
}

export interface Loan {
  EndDate: string;
  ID: string;
  ItemID: string;
  StartDate: string;
  UserID: string;
  Acronym: string;
  Quantity?: number;
}

export interface itemEdits {
  Ages?: string;
  IsArchived?: string;
  ItemName?: string;
  ItemType?: string;
  Location?: string;
  NumberOfParts?: string;
  Status?: string;
  Stock?: Number;
  TestID?: string;
}

export interface SignedOutItem {
  Name: string;
  ItemName: string;
  MeasureOf: string;
  Acronym: string;
  UserID: string;
  StartDate: string;
  EndDate: string;
}

export type RequiredTest = Partial<Test> & { ID: string; Name: string }; // only required fields of test, rest is optional
export type RequiredItem = Partial<Item> & {
  ID: string;
  TestID: string;
  Stock: Number;
};

export async function createNewTest(test: RequiredTest) {
  // Add new Test
  var endpoint = `/test/${test.ID}?Name=${test.Name}&IsArchived=0`;
  if (test.LevelOfUser) {
    endpoint += `&LevelOfUser=${test.LevelOfUser}`;
  }
  if (test.EditionNumber) {
    endpoint += `&EditionNumber=${test.EditionNumber}`;
  }
  if (test.MeasureOf) {
    endpoint += `&MeasureOf=${test.MeasureOf}`;
  }
  if (test.OrderingCompany) {
    endpoint += `&OrderingCompany=${test.MeasureOf}`;
  }
  if (test.Notes) {
    endpoint += `&Notes=${test.Notes}`;
  }
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}${endpoint}`
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

export async function getAllUsers() {
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/1`
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

export async function getItemNameById(itemId: string) {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/items`,
      {
        ID: itemId,
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );
    if (response.data) {
      return response.data[0].ItemName;
    }
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

export async function getLoanByName(
  itemName: string,
  isSignedOut: boolean = false
) {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/items`,
      JSON.stringify({
        ItemName: itemName,
      }),
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );
    const items = response.data;
    console.log(items);
    const res = [];
    if (items) {
      for (const item of items) {
        let post: any = {
          ItemID: item.ID,
        };
        if (isSignedOut) {
          post = {
            ...post,
            IsConfirmed: true,
          };
        }
        const loanResponse: AxiosResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/loans`,
          JSON.stringify(post),
          {
            headers: {
              "Content-Type": "application/json", // this shows the expected content type
            },
          }
        );
        if (loanResponse.data) {
          for (const loan of loanResponse.data) {
            const item: Item = await getItemById(loan.ItemID);
            const test: Test = await getTestById(item.TestID);
            const user: BackendUser = await getUserSettingsData(loan.UserID);
            res.push({
              ID: loan.ID,
              Name: test.Name,
              ItemName: item.ItemName,
              ItemType: item.ItemType,
              MeasureOf: test.MeasureOf,
              Acronym: item.ID,
              UserID: {
                firstName: user.FirstName,
                lastName: user.LastName,
                id: user.ID,
                email: user.Email,
                notifications: true, // WAITING ON adding notifications or isSubscribed to User table
                role: user.IsAdmin ? "admin" : "client",
              },
              StartDate: new Date(loan.StartDate),
              EndDate: new Date(loan.EndDate),
              Quantity: loan.Quantity!,
            });
          }
        }
      }
    }

    return res;
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

export async function getLoanByUserName(
  firstLastName: string,
  isSignedOut: boolean = false
) {
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
    const people = response.data;
    const res = [];
    if (people) {
      for (const person of people) {
        let post: any = {
          UserID: person.ID,
        };
        if (isSignedOut) {
          post = {
            UserID: person.ID,
            IsConfirmed: true,
          };
        }
        const loanResponse: AxiosResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/loans`,
          JSON.stringify(post),
          {
            headers: {
              "Content-Type": "application/json", // this shows the expected content type
            },
          }
        );
        if (loanResponse.data) {
          for (const loan of loanResponse.data) {
            const item: Item = await getItemById(loan.ItemID);
            const test: Test = await getTestById(item.TestID);
            const user: BackendUser = await getUserSettingsData(loan.UserID);
            res.push({
              ID: loan.ID,
              Name: test.Name,
              ItemName: item.ItemName,
              ItemType: item.ItemType,
              MeasureOf: test.MeasureOf,
              Acronym: item.ID,
              UserID: {
                firstName: user.FirstName,
                lastName: user.LastName,
                id: user.ID,
                email: user.Email,
                notifications: true, // WAITING ON adding notifications or isSubscribed to User table
                role: user.IsAdmin ? "admin" : "client",
              },
              StartDate: new Date(loan.StartDate),
              EndDate: new Date(loan.EndDate),
              Quantity: loan.Quantity!,
            });
          }
        }
      }
    }

    return res;
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

export async function getLoanByAcronym(acronym: string) {
  try {
    const loanResponse: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/loans`,
      JSON.stringify({
        ItemID: acronym,
      }),
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );
    return loanResponse.data;
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

export async function getLoanByID(loanId: string) {
  try {
    const loanResponse: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/loans`,
      JSON.stringify({
        ID: loanId,
      }),
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );

    if (loanResponse.data) {
      return loanResponse.data[0];
    }
    return loanResponse.data;
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

export async function createNewItem(newItem: RequiredItem) {
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
    const items = await getItemsForTest(testId);
    return {
      ...response.data,
      Items: items,
    };
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

export async function getTestByName(testName: string) {
  // Fetch a test by it's id
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/tests`,
      {
        filters: {
          Name: testName,
        },
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );

    // const items = await getItemsForTest(response.data.ID);

    // return { ...response.data, Items: items };
    const res = [];
    for (const test of response.data) {
      const items = await getItemsForTest(test.ID);
      res.push({
        ...test,
        Items: items,
      });
    }
    return res;
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

export async function getAllUnArchivedTests() {
  // Get all the tests in the database

  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/tests`,
      {
        filters: {
          IsArchived: false,
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

export async function getAllSignedOutItems() {
  // If userId, then get all of that user's signed out tests
  // otherwise get all signed out tests (admin)
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/loans`,
      {
        IsConfirmed: 1,
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );

    const loans: Loan[] = response.data;
    let result = [];
    for (const loan of loans) {
      const item: Item = await getItemById(loan.ItemID);
      const test: Test = await getTestById(item.TestID);
      const user: BackendUser = await getUserSettingsData(loan.UserID);
      result.push({
        ID: loan.ID,
        Name: test.Name,
        ItemName: item.ItemName,
        ItemType: item.ItemType,
        MeasureOf: test.MeasureOf,
        Acronym: item.ID,
        UserID: {
          firstName: user.FirstName,
          lastName: user.LastName,
          id: user.ID,
          email: user.Email,
          notifications: true, // WAITING ON adding notifications or isSubscribed to User table
          role: user.IsAdmin ? "admin" : "client",
        },
        StartDate: new Date(loan.StartDate),
        EndDate: new Date(loan.EndDate),
        Quantity: loan.Quantity!,
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

export async function getDashboardTests() {
  try {
    const res = [];
    const unarchivedTests = await getAllUnArchivedTests();

    for (const test of unarchivedTests) {
      const items = await getItemsForTest(test.ID);
      res.push({
        ...test,
        Items: items,
      });
    }

    return res;
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

export async function getArchivedTestsWithItems() {
  try {
    const res = [];
    const archivedTests = await getArchivedTests();

    for (const test of archivedTests) {
      const items = await getItemsForTest(test.ID);
      res.push({
        ...test,
        Items: items,
      });
    }

    return res;
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

export async function getAllSignedOutItemsByUser(userId: string) {
  // If userId, then get all of that user's signed out tests
  // otherwise get all signed out tests (admin)
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
    const loans: Loan[] = response.data;
    let result = [];
    for (const loan of loans) {
      const item: Item = await getItemById(loan.ItemID);
      const test: Test = await getTestById(item.TestID);
      const user: BackendUser = await getUserSettingsData(loan.UserID);
      result.push({
        ID: loan.ID,
        Name: test.Name,
        ItemName: item.ItemName,
        MeasureOf: test.MeasureOf,
        Acronym: item.ID,
        UserID: {
          firstName: user.FirstName,
          lastName: user.LastName,
          email: user.Email,
          notifications: true, // WAITING ON adding notifications or isSubscribed to User table
          role: user.IsAdmin ? "admin" : "client",
        },
        StartDate: new Date(loan.StartDate),
        EndDate: new Date(loan.EndDate),
        Quantity: loan.Quantity,
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
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/tests`,
      {
        filters: {
          IsArchived: 1,
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

export async function getArchivedTests() {
  try {
    const res = [];
    const unarchivedTests = await getAllArchivedTests();

    for (const test of unarchivedTests) {
      const items = await getItemsForTest(test.ID);
      res.push({
        ...test,
        Items: items,
      });
    }

    return res;
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
          LastNotified: new Date(), // WAITING ON lastNotified to be added to loans
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
    const signedOutItems = await getAllSignedOutItemsByUser(userId);
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
  ID: string;
  Name?: string;
  MeasureOf?: string;
  LevelOfUser?: string;
  EditionNumber?: string;
  OrderingCompany?: string;
  Notes?: string;
}) {
  // Update a test's attributes
  let endpoint = `/test/${edits.ID}?`;
  if (edits.Name) {
    endpoint += `&Name=${edits.Name}`;
  }
  if (edits.MeasureOf) {
    endpoint += `&MeasureOf=${edits.MeasureOf}`;
  }
  if (edits.LevelOfUser) {
    endpoint += `&LevelOfUser=${edits.LevelOfUser}`;
  }
  if (edits.EditionNumber) {
    endpoint += `&EditionNumber=${edits.EditionNumber}`;
  }
  if (edits.OrderingCompany) {
    endpoint += `&OrderingCompany=${edits.OrderingCompany}`;
  }
  if (edits.Notes) {
    endpoint += `&Notes=${edits.Notes}`;
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

export async function editItem(itemId: string, edits: Partial<Item>) {
  // Update a item's attributes
  let updates: Partial<Item> = {};
  if (edits.Ages) {
    updates["Ages"] = edits.Ages;
  }
  if (edits.IsArchived) {
    updates["IsArchived"] = edits.IsArchived;
  }
  if (edits.ItemName) {
    updates["ItemName"] = edits.ItemName;
  }
  if (edits.ItemType) {
    updates["ItemType"] = edits.ItemType;
  }
  if (edits.Location) {
    updates["Location"] = edits.Location;
  }
  if (edits.Status) {
    updates["Status"] = edits.Status;
  }
  if (edits.hasOwnProperty("Stock")) {
    updates["Stock"] = edits.Stock;
  }
  if (edits.TestID) {
    updates["TestID"] = edits.TestID;
  }
  if (edits.Notes) {
    updates["Notes"] = edits.Notes;
  }

  console.log({
    filters: {
      ID: itemId,
    },
    updated: updates,
  });
  try {
    const response: AxiosResponse = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/items`,
      {
        filters: {
          ID: itemId,
        },
        updated: updates,
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

export async function markOverdueItemAsGone(loanId: string) {
  // Delete Overdue test
  try {
    const response: AxiosResponse = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/loan/${loanId}`
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

export async function markItemAsSignedOut(loanId: string) {
  // When a reserved test is picked up by the client that reserved it, all items in test should have their quantities decremented by one
  // Create new loan w test id and user id
  // decrement quantity of item
  try {
    const response: AxiosResponse = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/loans`,
      {
        filters: {
          ID: loanId,
        },
        updated: {
          IsConfirmed: true,
        },
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );
    const loan: Loan[] = response.data;
    if (loan[0]) {
      const item: Item = await getItemById(loan[0].ItemID);
      await markOverdueItemAsGone(loan[0].ID);
      // await editItem(item.ID, { Stock: item.Stock.valueOf() + 1 });
    }
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

export async function unReserveItem(loanId: string) {
  // delete item
  // increment
  markItemAsAvailable(loanId);
}

export async function markItemAsAvailable(loanId: string) {
  // When clients return a test, admin should be able to mark the test as returned and now available
  // Delete loan from loans table
  // Increment quantities of item
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/loans`,
      {
        ID: loanId,
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );
    const loan: Loan[] = response.data;
    if (loan[0]) {
      const item: Item = await getItemById(loan[0].ItemID);
      await markOverdueItemAsGone(loan[0].ID);
      await editItem(item.ID, {
        Stock: item.Stock.valueOf() + loan[0].Quantity!,
      });
    }
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

function getDateTwoWeeksFromNow() {
  const today = new Date();
  const twoWeeksFromNow = new Date(today);
  twoWeeksFromNow.setDate(today.getDate() + 14);
  return `${twoWeeksFromNow.getFullYear()}-${String(
    twoWeeksFromNow.getMonth() + 1
  ).padStart(2, "0")}-${String(twoWeeksFromNow.getDate()).padStart(2, "0")}`;
}

function getTodayDate() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;
}

export async function markItemAsReserved(
  item: Item,
  quantity: number,
  recipientUserId: string
) {
  // Create a reservation loan
  // decrement stock of all items by quantities
  const start = getTodayDate();
  const end = getDateTwoWeeksFromNow();

  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/createLoan`,
      {
        EndDate: end,
        ID: "string",
        IsConfirmed: false,
        ItemID: item.ID,
        StartDate: start,
        UserID: recipientUserId,
        Quantity: quantity,
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );
    await editItem(item.ID, { Stock: item.Stock - quantity });

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

export async function getAllReservedItems() {
  // If userId, then get all of that user's signed out tests
  // otherwise get all signed out tests (admin)
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/loans`,
      {
        IsConfirmed: false,
      },
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );

    const reservedItems: Loan[] = response.data;
    let result = [];
    for (const reservedItem of reservedItems) {
      const item: Item = await getItemById(reservedItem.ItemID);
      const test: Test = await getTestById(item.TestID);
      const user: BackendUser = await getUserSettingsData(reservedItem.UserID);
      result.push({
        ID: reservedItem.ID,
        Name: test.Name,
        ItemName: item.ItemName,
        ItemType: item.ItemType,
        MeasureOf: test.MeasureOf,
        Acronym: item.ID,
        UserID: {
          firstName: user.FirstName,
          lastName: user.LastName,
          email: user.Email,
          notifications: true, // WAITING ON adding notifications or isSubscribed to User table
          role: user.IsAdmin ? "admin" : "client",
        },
        StartDate: new Date(reservedItem.StartDate),
        EndDate: new Date(reservedItem.EndDate),
        Quantity: reservedItem.Quantity,
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

export async function unArchiveTest(testId: string) {
  // Unarchive a test
  try {
    const response: AxiosResponse = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/tests`,
      {
        filters: {
          ID: testId,
        },
        update: {
          IsArchived: false,
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

export async function archiveTest(testId: string) {
  // Archive a test
  try {
    const response: AxiosResponse = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/tests`,
      {
        filters: {
          ID: testId,
        },
        update: {
          IsArchived: true,
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

export async function getItemMeasure(itemId: string) {
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/item/${itemId}`
    );

    const item: Item = response.data;
    if (item) {
      const test: Test = await getTestById(item.TestID);
      if (test) {
        return test.MeasureOf;
      }
      return "";
    }
    return "";
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

export async function getTestNameByItem(itemId: string) {
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/item/${itemId}`
    );

    const item: Item = response.data;
    if (item) {
      const test: Test = await getTestById(item.TestID);
      if (test) {
        return test.Name;
      }
      return "";
    }
    return "";
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

export async function getItemOrderingCompany(itemId: string) {
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/item/${itemId}`
    );

    const item: Item = response.data;
    if (item) {
      const test: Test = await getTestById(item.TestID);
      if (test) {
        return test.OrderingCompany;
      }
      return "";
    }
    return "";
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

export async function getItemEditionNumber(itemId: string) {
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/item/${itemId}`
    );

    const item: Item = response.data;
    if (item) {
      const test: Test = await getTestById(item.TestID);
      if (test) {
        return test.EditionNumber;
      }
      return "";
    }
    return "";
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

export async function getLowStockItems() {
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/items`
    );

    let lowStockItems: any[] = [];
    for (let i = 0; i < 5; i++) {
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/items`,
        {
          Stock: i,
        },
        {
          headers: {
            "Content-Type": "application/json", // this shows the expected content type
          },
        }
      );
      lowStockItems = lowStockItems.concat(res.data);
    }

    const res = [];
    for (const item of lowStockItems) {
      if (item.Stock < 5) {
        const testName = (await getTestNameByItem(item.ID).catch()) || "";

        const orderingCompany =
          (await getItemOrderingCompany(item.ID).catch()) || "";

        const editionNumber =
          (await getItemEditionNumber(item.ID).catch()) || "";

        res.push({
          ...item,
          OrderingCompany: orderingCompany,
          Name: testName,
          EditionNumber: editionNumber,
        });
      }
    }

    return res;
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

export async function getAllOrderingCompanies() {
  const response: AxiosResponse = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/tests`
  );

  if (response) {
    return _.uniq(
      response.data.map((test: Test) => test.OrderingCompany)
    ) as string[];
  }
  return [];
}

export async function getLoansForItem(itemId: string) {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/loans`,
      JSON.stringify({
        ItemID: itemId,
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

export async function getLoansForItemFormatted(
  itemId: string,
  isSignedOut: boolean = false
) {
  let post: any = {
    ItemID: itemId,
  };
  if (isSignedOut) {
    post = {
      ItemID: itemId,
      IsConfirmed: true,
    };
  }
  console.log(post);
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/loans`,
      JSON.stringify({
        ItemID: itemId,
      }),
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );
    const loans: Loan[] = response.data;
    let result = [];
    for (const loan of loans) {
      const item: Item = await getItemById(loan.ItemID);
      const test: Test = await getTestById(item.TestID);
      const user: BackendUser = await getUserSettingsData(loan.UserID);
      result.push({
        ID: loan.ID,
        Name: test.Name,
        ItemName: item.ItemName,
        ItemType: item.ItemType,
        MeasureOf: test.MeasureOf,
        Acronym: item.ID,
        UserID: {
          firstName: user.FirstName,
          lastName: user.LastName,
          id: user.ID,
          email: user.Email,
          notifications: true, // WAITING ON adding notifications or isSubscribed to User table
          role: user.IsAdmin ? "admin" : "client",
        },
        StartDate: new Date(loan.StartDate),
        EndDate: new Date(loan.EndDate),
        Quantity: loan.Quantity!,
      });
    }
    return result;
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

export async function getLoansByItemNameFormatted(itemId: string) {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/loans`,
      JSON.stringify({
        ItemID: itemId,
      }),
      {
        headers: {
          "Content-Type": "application/json", // this shows the expected content type
        },
      }
    );
    const loans: Loan[] = response.data;
    let result = [];
    for (const loan of loans) {
      const item: Item = await getItemById(loan.ItemID);
      const test: Test = await getTestById(item.TestID);
      const user: BackendUser = await getUserSettingsData(loan.UserID);
      result.push({
        ID: loan.ID,
        Name: test.Name,
        ItemName: item.ItemName,
        MeasureOf: test.MeasureOf,
        Acronym: item.ID,
        UserID: {
          firstName: user.FirstName,
          lastName: user.LastName,
          id: user.ID,
          email: user.Email,
          notifications: true, // WAITING ON adding notifications or isSubscribed to User table
          role: user.IsAdmin ? "admin" : "client",
        },
        StartDate: new Date(loan.StartDate),
        EndDate: new Date(loan.EndDate),
        Quantity: loan.Quantity!,
      });
    }
    return result;
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

export async function deleteLoan(loanId: string) {
  try {
    const response: AxiosResponse = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/loan/${loanId}`
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

export async function deleteEntireTest(testId: string) {
  try {
    const testItems: Item[] = await getItemsForTest(testId);
    for (const item of testItems) {
      const loans: Loan[] = await getLoansForItem(item.ID);
      for (const loan of loans) {
        await deleteLoan(loan.ID);
      }
      await deleteItem(item.ID);
    }
    await deleteTest(testId);
    return;
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
