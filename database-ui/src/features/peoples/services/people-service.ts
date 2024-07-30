import { httpClient } from "../../../httpClient/httpClient";
import { People } from "../models";

const path = "/api/peoples";

async function getPeoples(): Promise<People[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getPeople(id: number): Promise<People> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deletePeople(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createPeople(data: Omit<People, "peopleId">): Promise<People> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updatePeople({ peopleId, ...data }: People): Promise<People> {
  const response = await httpClient(`${path}/${peopleId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getPeoples, getPeople, deletePeople, createPeople, updatePeople };
