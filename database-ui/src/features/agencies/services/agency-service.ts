import { httpClient } from "../../../httpClient/httpClient";
import { Agency } from "../models";

const path = "/api/agencies";

async function getAgencies(): Promise<Agency[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getAgency(id: number): Promise<Agency> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteAgency(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createAgency(data: Omit<Agency, "agencyId">): Promise<Agency> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateAgency({ agencyId, ...data }: Agency): Promise<Agency> {
  const response = await httpClient(`${path}/${agencyId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getAgencies, getAgency, deleteAgency, createAgency, updateAgency };
