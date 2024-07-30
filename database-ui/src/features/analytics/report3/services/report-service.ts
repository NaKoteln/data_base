import { httpClient } from "../../../../httpClient/httpClient";
import { Report } from "../models";

const path = "/api/analytics/3";

async function getReport(category: string, country: string, startDate: string, endDate: string): Promise<Report> {
  const response = await httpClient(`${path}/?category=${category}&country=${country}&startDate=${startDate}&endDate=${endDate}`, {
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

export { getReport };
