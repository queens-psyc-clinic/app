/*
This service handles shopping cart
*/

import axios, { AxiosResponse } from "axios";

// NO NEED FOR BACKEND ENDPOINTS FOR ANY OF THESE :)
// Shopping carts stored in Local Storage in the browser

export async function addTestToCart(itemId: string) {
  // Add a test to the user's cart in local storage
}

export async function increaseQuantityofTest(
  itemId: string,
  newQuantity: Number
) {
  // When you increase the quantity of the a test in the shopping cart
}

export async function checkIfCartIsValid() {
  // Checks if all items in the cart (in the specified quantities) are available
}

export async function checkout(userId: string) {
  // Mark all items (in the specified quantities) as reserved (for 2 hours) by the userId
}
