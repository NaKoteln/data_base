import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Report } from "../models";

interface ReportTableProps {
  report: Report[];
  children?: ReactNode;
}

function ReportTable(props: ReportTableProps) {

  function setGender(data: boolean) {
    if (data) return "Man"
    return "Woman"
  }

  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Last name</th>
            <th>First name</th>
            <th>Passport data</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {props.report.map((r) => (
            <tr key={r.touristId}>
              <td>{r.touristId}</td>
              <td>{r.category}</td>
              <td>{r.People.lastName}</td>
              <td>{r.People.firstName}</td>
              <td>{r.People.passportData}</td>
              <td>{setGender(r.People.gender)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
