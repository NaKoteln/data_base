import { useEffect, useState } from "react";
import { Document } from "../models";
import { getDocuments } from "../services/document-service";
import DocumentsTable from "../containers/DocumentsTable";
import DeleteDocumentBtn from "../components/DeleteDocumentBtn";
import EditDocumentBtn from "../components/EditDocumentBtn";

function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  const initDocuments = () => {
    getDocuments().then((data) => setDocuments(data));
  };

  useEffect(() => {
    initDocuments();
  }, []);

  return (
    <>
      <DocumentsTable
        documents={documents}
        actionSlot={(d) => (
          <div className="text-end">
            <EditDocumentBtn documentId={d.documentId} onChange={initDocuments} />{" "}
            <DeleteDocumentBtn documentId={d.documentId} onDeleted={initDocuments} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Visa documents</h3>
          <EditDocumentBtn onChange={initDocuments} />
        </div>
      </DocumentsTable>
    </>
  );
}

export default DocumentsPage;
