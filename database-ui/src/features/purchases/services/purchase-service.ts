import { httpClient } from "../../../httpClient/httpClient";
import { Purchase } from "../models";

const path = "/api/purchases";

async function getPurchases(): Promise<Purchase[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getPurchase(id: number): Promise<Purchase> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deletePurchase(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createPurchase(data: Omit<Purchase, "purchaseId">): Promise<Purchase> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updatePurchase({ purchaseId, ...data }: Purchase): Promise<Purchase> {
  const response = await httpClient(`${path}/${purchaseId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getPurchases, getPurchase, deletePurchase, createPurchase, updatePurchase };
