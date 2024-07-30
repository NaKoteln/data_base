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
            <th>Count of tourist</th>
          </tr>
        </thead>
        <tbody>
            <tr key={props.report.result}>
              <td>{props.report.result}</td>
            </tr>
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
