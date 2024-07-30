import { httpClient } from "../../../httpClient/httpClient";
import { Group } from "../models";

const path = "/api/groups";

async function getGroups(): Promise<Group[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getGroup(id: number): Promise<Group> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteGroup(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createGroup(data: Omit<Group, "groupId">): Promise<Group> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateGroup({ groupId, ...data }: Group): Promise<Group> {
  const response = await httpClient(`${path}/${groupId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getGroups, getGroup, deleteGroup, createGroup, updateGroup };
