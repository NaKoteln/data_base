import { httpClient } from "../../../httpClient/httpClient";
import { Tourist } from "../models";

const path = "/api/tourists";

async function getTourists(): Promise<Tourist[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getTourist(id: number): Promise<Tourist> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteTourist(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createTourist(data: Omit<Tourist, "touristId">): Promise<Tourist> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateTourist({ touristId, ...data }: Tourist): Promise<Tourist> {
  const response = await httpClient(`${path}/${touristId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getTourists, getTourist, deleteTourist, createTourist, updateTourist };
