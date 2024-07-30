import { httpClient } from "../../../httpClient/httpClient";
import { Item } from "../models";

const path = "/api/warehouses";

async function getItems(): Promise<Item[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function deleteItem(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createItem(data: Omit<Item, "productId">): Promise<Item> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function getItem(id: number) {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function updateItem({ productId, ...data }: Item): Promise<Item> {
  const response = await httpClient(`${path}/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getItems, getItem, deleteItem, createItem, updateItem };
