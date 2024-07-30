import { httpClient } from "../../../httpClient/httpClient";
import { Hotel } from "../models";

const path = "/api/hotels";

async function getHotels(): Promise<Hotel[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getHotel(id: number): Promise<Hotel> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteHotel(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createHotel(data: CreateHotelRequest): Promise<Hotel> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateHotel(
  id: number,
  data: CreateHotelRequest
): Promise<Hotel> {
  const response = await httpClient(`${path}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getHotels, getHotel, deleteHotel, createHotel, updateHotel };

interface CreateHotelRequest {
  name: string;
  nightCost: number;
}
