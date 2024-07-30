import { httpClient } from "../../../../httpClient/httpClient";
import { Report } from "../models";

const path = "/api/analytics/1";

async function getReport(category: string): Promise<Report[]> {
  const response = await httpClient(`${path}/?category=${category}`, {
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

export { getReport };
