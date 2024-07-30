import { httpClient } from "../../../httpClient/httpClient";
import { Visa } from "../models";

const path = "/api/visas";

async function getVisas(): Promise<Visa[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getVisa(id: number): Promise<Visa> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteVisa(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createVisa(data: Omit<Visa, "visaId">): Promise<Visa> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateVisa({ visaId, ...data }: Visa): Promise<Visa> {
  const response = await httpClient(`${path}/${visaId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getVisas, getVisa, deleteVisa, createVisa, updateVisa };
