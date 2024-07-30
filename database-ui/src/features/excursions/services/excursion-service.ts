import { httpClient } from "../../../httpClient/httpClient";
import { Excursion } from "../models";

const path = "/api/excursions";

async function getExcursions(): Promise<Excursion[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function deleteExcursion(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createExcursion(data: CreateExcursionRequest): Promise<Excursion> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function getExcursion(id: number) {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function updateExcursion(id: number, data: CreateExcursionRequest): Promise<Excursion> {
  const response = await httpClient(`${path}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getExcursions, deleteExcursion, createExcursion, getExcursion, updateExcursion };

interface CreateExcursionRequest {
  agencyId: number;
  name: string;
  cost: number;
  maximumPeople: number;
}
