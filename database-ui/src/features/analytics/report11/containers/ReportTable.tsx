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
            <th>Expense</th>
            <th>Income</th>
          </tr>
        </thead>
        <tbody>
          <tr key={props.report.income}>
            <td>{props.report.expense}</td>
            <td>{props.report.income}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
