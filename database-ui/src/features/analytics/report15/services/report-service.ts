import { httpClient } from "../../../../httpClient/httpClient";
import { Report } from "../models";

const path = "/api/analytics/15";

async function getReport(flightId: number): Promise<Report[]> {
  const response = await httpClient(`${path}/?flightId=${flightId}`, {
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

export { getReport };
