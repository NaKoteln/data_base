import { httpClient } from "../../../httpClient/httpClient";
import { Flight } from "../models";

const path = "/api/flights";

async function getFlights(): Promise<Flight[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function deleteFlight(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createFlight(data: CreateFlightRequest): Promise<Flight> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateFlight(id: number, data: CreateFlightRequest): Promise<Flight> {
  const response = await httpClient(`${path}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getFlights, deleteFlight, createFlight, updateFlight };

interface CreateFlightRequest {
    seatsNumber: number;
    cargoSeats: number;
}
