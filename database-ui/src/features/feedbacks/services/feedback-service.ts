import { httpClient } from "../../../httpClient/httpClient";
import { Feedback } from "../models";

const path = "/api/feedbacks";

async function getFeedbacks(): Promise<Feedback[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getFeedback(id: number): Promise<Feedback> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteFeedback(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createFeedback(data: Omit<Feedback, "recordId">): Promise<Feedback> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateFeedback({ recordId, ...data }: Feedback): Promise<Feedback> {
  const response = await httpClient(`${path}/${recordId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getFeedbacks, getFeedback, deleteFeedback, createFeedback, updateFeedback };
