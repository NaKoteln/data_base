import { httpClient } from "../../../httpClient/httpClient";
import { FlightSchedule } from "../models";

const path = "/api/flightSchedules";

async function getSchedules(): Promise<FlightSchedule[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getSchedule(id: number): Promise<FlightSchedule> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteSchedule(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createSchedule(data: Omit<FlightSchedule, "scheduleId">): Promise<FlightSchedule> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateSchedule({ scheduleId, ...data }: FlightSchedule): Promise<FlightSchedule> {
  const response = await httpClient(`${path}/${scheduleId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getSchedules, getSchedule, deleteSchedule, createSchedule, updateSchedule };
