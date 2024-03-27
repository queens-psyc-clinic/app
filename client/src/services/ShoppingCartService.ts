/*
This service handles shopping cart
*/

import axios, { AxiosResponse } from "axios";
import { Item, getItemById } from "./TestService";

// NO NEED FOR BACKEND ENDPOINTS FOR ANY OF THESE :)
// Shopping carts stored in Local Storage in the browser
const localStorageCart = "cart";
interface CartItem {
  quantity: Number;
  item: Item;
}

function _isCartInitialized() {
  if (localStorage.getItem(localStorageCart) == null) {
    return false;
  }
  return true;
}
export function initializeCart() {
  if (!_isCartInitialized()) {
    localStorage.setItem(localStorageCart, JSON.stringify([]));
  }
}

export function getCart(): CartItem[] {
  if (_isCartInitialized()) {
    return [];
  } else {
    const stringCart = localStorage.getItem(localStorageCart);
    return JSON.parse(stringCart!);
  }
}

export async function addItemToCart(itemId: string) {
  // Add a test to the user's cart in local storage
  const cart = getCart();
  const item = await getItemById(itemId);
  if (item) {
    cart.push({
      quantity: 1,
      item: item,
    });
    localStorage.setItem(localStorageCart, JSON.stringify(cart));
  }
  console.log(localStorage);
}

export async function increaseQuantityofTest(
  itemId: string,
  newQuantity: Number
) {
  // When you increase the quantity of the a test in the shopping cart
  const cart = getCart();
  const updatedCart = cart.map((cartItem) => {
    if (cartItem.item.ID === itemId) {
      return {
        ...cartItem,
        quantity: newQuantity,
      };
    } else {
      return cartItem;
    }
  });
  console.log(cart);

  localStorage.setItem(localStorageCart, JSON.stringify(updatedCart));
}

export async function checkIfCartIsValid() {
  // Checks if all items in the cart (in the specified quantities) are available
}

export async function checkout(userId: string) {
  // Mark all items (in the specified quantities) as reserved (for 2 hours) by the userId
}
