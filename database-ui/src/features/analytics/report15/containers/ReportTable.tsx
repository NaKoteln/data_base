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
            <th>Flight number</th>
            <th>Flight date</th>
            <th>Tourist Id</th>
            <th>Group Id</th>
            <th>Group name</th>
            <th>Hotel</th>
            <th>Cargo</th>
          </tr>
        </thead>
        <tbody>
          {props.report.map((r) => (
          <tr key={r.flightnumber}>
            <td>{r.flightnumber}</td>
            <td>{new Date(r.flightdate).toISOString().split('T')[0]}</td>
            <td>{r.touristId}</td>
            <td>{r.groupId}</td>
            <td>{r.groupname}</td>
            <td>{r.hotel}</td>
            <td>{r.cargo}</td>
          </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
