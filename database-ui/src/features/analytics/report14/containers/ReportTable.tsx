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
            <th>Total tourists</th>
            <th>Rest tourists</th>
            <th>Shop tourists</th>
            <th>Rest to shop ratio</th>
          </tr>
        </thead>
        <tbody>
          {props.report.map((r) => (
            <tr key={r.leisureshopratio}>
              <td>{r.totaltourists}</td>
              <td>{r.leisuretourists}</td>
              <td>{r.shoptourists}</td>
              <td>{new Number(r.leisureshopratio).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
