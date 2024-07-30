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
            <th>Product name</th>
            <th>Total shipments</th>
            <th>Share percentage</th>
          </tr>
        </thead>
        <tbody>
          {props.report.map((r) => (
            <tr key={1}>
              <td>{r.name}</td>
              <td>{r.totalshipments}</td>
              <td>{r.sharepercentage}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
