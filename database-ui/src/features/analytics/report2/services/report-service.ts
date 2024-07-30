import { httpClient } from "../../../../httpClient/httpClient";
import { Report } from "../models";

const path = "/api/analytics/2";

async function getReport(category: string, hotelName: string): Promise<Report[]> {
  const response = await httpClient(`${path}/?category=${category}&hotelName=${hotelName}`, {
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

export { getReport };
