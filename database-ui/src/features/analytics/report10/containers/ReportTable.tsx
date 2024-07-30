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
            <th>Group Id</th>
            <th>Count of tourists</th>
            <th>Total excursion cost</th>
            <th>Total hotel cost</th>
          </tr>
        </thead>
        <tbody>
          {props.report.map((r) => (
            <tr key={r.groupId}>
              <td>{r.groupId}</td>
              <td>{r.totaltourists}</td>
              <td>{r.totalexcursioncost}</td>
              <td>{r.totalhotelcost.days}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
