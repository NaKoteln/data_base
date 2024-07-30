import { httpClient } from "../../../httpClient/httpClient";
import { Country } from "../models";

const path = "/api/countries";

async function getCountries(): Promise<Country[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getCountry(id: number): Promise<Country> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteCountry(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createCountry(data: Omit<Country, "countryId">): Promise<Country> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateCountry({ countryId, ...data }: Country): Promise<Country> {
  const response = await httpClient(`${path}/${countryId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getCountries, getCountry, deleteCountry, createCountry, updateCountry };
