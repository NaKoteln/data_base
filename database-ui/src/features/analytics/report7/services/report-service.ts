import { httpClient } from "../../../../httpClient/httpClient";
import { Report } from "../models";

const path = "/api/analytics/7";

async function getReport(): Promise<Report> {
  const response = await httpClient(path, {
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

export { getReport };
