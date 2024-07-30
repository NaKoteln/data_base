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
            <th>Total seats</th>
            <th>Occupied seats</th>
            <th>Total cargo weight</th>
          </tr>
        </thead>
        <tbody>
          {props.report.map((f) => (
          <tr key={f.flightId}>
            <td>{f.flightId}</td>
            <td>{f.total_seats}</td>
            <td>{f.occupied_seats}</td>
            <td>{f.total_cargo_weight}</td>
          </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
