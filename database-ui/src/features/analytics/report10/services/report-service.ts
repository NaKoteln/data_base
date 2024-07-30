import { httpClient } from "../../../../httpClient/httpClient";
import { Report } from "../models";

const path = "/api/analytics/10";

async function getReport(category: string, groupId: number): Promise<Report[]> {
  const response = await httpClient(`${path}/?category=${category}&groupId=${groupId}`, {
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

export { getReport };
