import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Report } from "../models";

interface ReportTableProps {
  report: Report;
  children?: ReactNode;
}

function ReportTable(props: ReportTableProps) {

  function outputForDate(prop: Date) {
    if  (prop == null) {
      return ""
    } else {
      return new Date(props.report.flights[0].firstArrival).toISOString().split('T')[0]
    }
  }

  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>Count visits</th>
            <th>First arrival</th>
            <th>Last departure</th>
          </tr>
        </thead>
        <tbody>
          <tr key={1}>
            <td>{props.report.flights[0].visits}</td>
            <td>{outputForDate(props.report.flights[0].firstArrival)}</td>
            <td>{outputForDate(props.report.flights[0].lastDeparture)}</td>
          </tr>
        </tbody>
      </Table>
      <Table>
      <thead>
        <tr>
          <th>Hotel name</th>
          <th>Check in date</th>
          <th>Check out date</th>
        </tr>
      </thead>
      <tbody>
        {props.report.hotels.map((h) => (
          <tr key={2}>
            <td>{h.hotelName}</td>
            <td>{new Date(h.checkInDate).toISOString().split('T')[0]}</td>
            <td>{new Date(h.checkOutDate).toISOString().split('T')[0]}</td>
          </tr>
        ))}
      </tbody>
      </Table>
      <Table>
      <thead>
        <tr>
          <th>Excursion name</th>
          <th>Agency Name</th>
        </tr>
      </thead>
      <tbody> 
        {props.report.excursions.map((e) => (
          <tr key={2}>
            <td>{e.excursionName}</td>
            <td>{e.agencyName}</td>
          </tr>
        ))}
      </tbody>
      </Table>
      <Table>
      <thead>
        <tr>
          <th>Purchase name</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        {props.report.purchases.map((p) => (
          <tr key={2}>
            <td>{p.name}</td>
            <td>{p.weight}</td>
          </tr>
        ))}
      </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
