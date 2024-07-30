import { httpClient } from "../../../httpClient/httpClient";
import { Service } from "../models";

const path = "/api/services";

async function getServices(): Promise<Service[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getActualServices(): Promise<Service[]> {
  const response = await httpClient(`${path}/actual`);
  return await response.json();
}

async function getService(id: number): Promise<Service> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteService(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createService(data: Omit<Service, "serviceId">): Promise<Service> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getServices, getActualServices, getService, deleteService, createService };
