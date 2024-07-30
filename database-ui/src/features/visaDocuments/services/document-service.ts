import { httpClient } from "../../../httpClient/httpClient";
import { Document } from "../models";

const path = "/api/visaDocuments";

async function getDocuments(): Promise<Document[]> {
  const response = await httpClient(path);
  return await response.json();
}

async function getDocument(id: number): Promise<Document> {
  const response = await httpClient(`${path}/${id}`);
  return await response.json();
}

async function deleteDocument(id: number): Promise<void> {
  await httpClient(`${path}/${id}`, { method: "DELETE" });
}

async function createDocument(data: Omit<Document, "documentId">): Promise<Document> {
  const response = await httpClient(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function updateDocument({ documentId, ...data }: Document): Promise<Document> {
  const response = await httpClient(`${path}/${documentId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export { getDocuments, getDocument, deleteDocument, createDocument, updateDocument };
