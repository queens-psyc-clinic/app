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
  if (!_isCartInitialized()) {
    return [];
  } else {
    const stringCart = localStorage.getItem(localStorageCart);
    return JSON.parse(stringCart!);
  }
}

export async function addItemToCart(itemId: string) {
  // Add a test to the user's cart in local storage
  const cart = getCart();
  console.log("pre: ", cart);
  const item = await getItemById(itemId);
  if (item) {
    if (isItemInCart(itemId)) {
      console.log(getQuantityofItem(itemId));
      increaseQuantityofTest(itemId, (getQuantityofItem(itemId) as number) + 1);
    } else {
      cart.push({
        quantity: 1,
        item: item,
      });
      localStorage.setItem(localStorageCart, JSON.stringify(cart));
    }
    console.log("post: ", cart);
  }
}

export async function increaseQuantityofTest(
  itemId: string,
  newQuantity: Number
) {
  // When you increase the quantity of the a test in the shopping cart
  const cart: CartItem[] = getCart();
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
  localStorage.setItem(localStorageCart, JSON.stringify(updatedCart));
}

export function isItemInCart(itemId: string) {
  const cart = getCart();
  const ind = cart.find((cartItem) => cartItem.item.ID === itemId);
  if (ind) {
    return true;
  }
  return false;
}

export function clearCart() {
  localStorage.setItem(localStorageCart, JSON.stringify([]));
}

export function getQuantityofItem(itemId: string) {
  const cart = getCart();
  const ind = cart.findIndex((cartItem) => cartItem.item.ID === itemId);
  if (ind >= 0) {
    return cart[ind].quantity;
  } else {
    return 0;
  }
}

export async function checkIfCartIsValid() {
  // Checks if all items in the cart (in the specified quantities) are available
  const cart: CartItem[] = getCart();
  for (const cartItem of cart) {
    if (cartItem.item.Stock < cartItem.quantity) {
      return false;
    }
  }
  return true;
}

export async function checkout(userId: string) {
  // Mark all items (in the specified quantities) as reserved (for 2 hours) by the userId
  // WAITING ON reservation table and notification CRONs
  clearCart();
}
