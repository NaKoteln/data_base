import { httpClient } from "../../../../httpClient/httpClient";
import { Report } from "../models";

const path = "/api/analytics/5";

async function getReport(startDate: string, endDate: string): Promise<Report[]> {
  const response = await httpClient(`${path}/?startDate=${startDate}&endDate=${endDate}`, {
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

export { getReport };
