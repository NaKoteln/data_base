import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Record } from "../models";

interface RecordsTableProps {
  records: Record[];
  actionSlot?: (p: Record) => ReactNode;
  children?: ReactNode;
}

function RecordsTable(props: RecordsTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>Tourist Id</th>
            <th>Schedule Id</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.records.map((r) => (
            <tr key={r.scheduleId}>
              <td>{r.touristId}</td>
              <td>{r.scheduleId}</td>
              {props.actionSlot && <td>{props.actionSlot(r)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default RecordsTable;
