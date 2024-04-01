import axios, { AxiosError, AxiosResponse } from "axios";

export async function initializeSearchTree(page: string) {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/search/${undefined}`,
      {
        Page: page,
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

export async function getSearchSuggestions(query: string) {
  if (query == "") {
    return [];
  }
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/search/${query}`
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
