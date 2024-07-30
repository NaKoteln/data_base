import { httpClient } from "../../../../httpClient/httpClient";
import { Report } from "../models";

const path = "/api/analytics/4";

async function getReport(country: string, touristId: number): Promise<Report> {
  const response = await httpClient(`${path}/?country=${country}&touristId=${touristId}`, {
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

export { getReport };
