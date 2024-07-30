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
            <th>Hotel</th>
            <th>Tourist Id</th>
            <th>Last name</th>
            <th>First name</th>
            <th>Check in date</th>
            <th>Check out date</th>
            <th>Group Id</th>
          </tr>
        </thead>
        <tbody>
          {props.report.map((r) => (
            <tr key={r.Tourist.touristId}>
              <td>{r.Hotel.name}</td>
              <td>{r.Tourist.touristId}</td>
              <td>{r.Tourist.People.lastName}</td>
              <td>{r.Tourist.People.firstName}</td>
              <td>{new Date(r.checkInDate).toISOString().split('T')[0]}</td>
              <td>{new Date(r.checkOutDate).toISOString().split('T')[0]}</td>
              <td>{r.Tourist.groupId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
