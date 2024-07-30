import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Report } from "../models";

interface ReportTableProps {
  report: Report[];
  children?: ReactNode;
}

function ReportTable(props: ReportTableProps) {

  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>Hotel name</th>
            <th>Occupied rooms</th>
            <th>Total guests</th>
          </tr>
        </thead>
        <tbody>
          {props.report.map((h) => (
            <tr key={2}>
              <td>{h.name}</td>
              <td>{h.occupiedrooms}</td>
              <td>{h.totalguests}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
