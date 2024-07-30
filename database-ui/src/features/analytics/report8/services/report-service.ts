import { httpClient } from "../../../../httpClient/httpClient";
import { Report } from "../models";

const path = "/api/analytics/8";

async function getReport(flightNumber: number, date: string): Promise<Report[]> {
  const response = await httpClient(`${path}/?flightNumber=${flightNumber}&date=${date}`, {
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

export { getReport };
