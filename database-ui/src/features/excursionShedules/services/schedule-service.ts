import { httpClient } from "../../../httpClient/httpClient";
import { ExcursionSchedule } from "../models";

const path = "/api/excursionSchedules";

async function getSchedules(): Promise<ExcursionSchedule[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getSchedule(id: number): Promise<ExcursionSchedule> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteSchedule(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createSchedule(data: Omit<ExcursionSchedule, "scheduleId">): Promise<ExcursionSchedule> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateSchedule({ scheduleId, ...data }: ExcursionSchedule): Promise<ExcursionSchedule> {
  const response = await httpClient(`${path}/${scheduleId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getSchedules, getSchedule, deleteSchedule, createSchedule, updateSchedule };
