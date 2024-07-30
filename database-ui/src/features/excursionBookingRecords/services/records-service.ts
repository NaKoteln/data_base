import { httpClient } from "../../../httpClient/httpClient";
import { Record } from "../models";

const path = "/api/excursionBookings";

async function getRecords(): Promise<Record[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getRecord(tId: number, sId: number): Promise<Record> {
  const response = await httpClient(`${path}/${tId}/${sId}`);
  return await response.json();
}

async function deleteRecord(tId: number, sId: number): Promise<void> {
  await httpClient(`${path}/${tId}/${sId}`, { method: "DELETE" });
}

async function createRecord(data: Record): Promise<Record> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateRecord(record: Record, { ...data }: Record): Promise<Record> {
  const response = await httpClient(`${path}/${record.touristId}/${record.scheduleId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getRecords, getRecord, deleteRecord, createRecord, updateRecord };
