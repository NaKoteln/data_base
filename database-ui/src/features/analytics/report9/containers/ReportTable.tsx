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
            <th>Total flights count</th>
            <th>Total weight</th>
            <th>Occupied seats</th>
          </tr>
        </thead>
        <tbody>
          {props.report.map((f) => (
          <tr key={f.totalFlights}>
            <td>{f.totalFlights}</td>
            <td>{f.totalWeight}</td>
            <td>{f.occupiedSeats}</td>
          </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
