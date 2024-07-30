import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Report } from "../models";

interface ReportTableProps {
  report: Report;
  children?: ReactNode;
}

function ReportTable(props: ReportTableProps) {

  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>Excursion id</th>
            <th>Excursion name</th>
            <th>Count bookings</th>
          </tr>
        </thead>
        <tbody>
          {props.report.excursions.map((e) => (
            <tr key={1}>
              <td>{e.excursionId}</td>
              <td>{e.name}</td>
              <td>{e.count_bookings}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <th>Agency id</th>
            <th>Agency name</th>
            <th>Average estimation</th>
          </tr>
        </thead>
        <tbody>
          {props.report.agencies.map((a) => (
            <tr key={2}>
              <td>{a.agencyId}</td>
              <td>{a.name}</td>
              <td>{a.average_estimation}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
