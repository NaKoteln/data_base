import { httpClient } from "../../../httpClient/httpClient";
import { Booking } from "../models";

const path = "/api/bookings";

async function getBookings(): Promise<Booking[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getBooking(id: number): Promise<Booking> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteBooking(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createBooking(data: Omit<Booking, "bookingId">): Promise<Booking> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateBooking({ bookingId, ...data }: Booking): Promise<Booking> {
  const response = await httpClient(`${path}/${bookingId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getBookings, getBooking, deleteBooking, createBooking, updateBooking };
