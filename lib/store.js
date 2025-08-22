// lib/store.js
let products = [];

export function getProducts() {
  return products;
}

export function addProduct(product) {
  products.push(product);
}
