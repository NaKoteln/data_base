import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Document } from "../models";

interface DocumentsTableProps {
  documents: Document[];
  actionSlot?: (p: Document) => ReactNode;
  children?: ReactNode;
}

function DocumentsTable(props: DocumentsTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Visa Id</th>
            <th>Document name</th>
            <th>Document content</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.documents.map((d) => (
            <tr key={d.documentId}>
              <td>{d.documentId}</td>
              <td>{d.visaId}</td>
              <td>{d.name}</td>
              <td>{d.content}</td>
              {props.actionSlot && <td>{props.actionSlot(d)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default DocumentsTable;
