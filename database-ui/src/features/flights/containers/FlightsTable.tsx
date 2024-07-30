import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Flight } from "../models";

interface FlightsTableProps {
  flights: Flight[];
  actionSlot?: (f: Flight) => ReactNode;
  children?: ReactNode;
}

function FlightsTable(props: FlightsTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Seats number</th>
            <th>Cargo seats number</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.flights.map((f) => (
            <tr key={f.flightId}>
              <td>{f.flightId}</td>
              <td>{f.seatsNumber}</td>
              <td>{f.cargoSeats}</td>
              {props.actionSlot && <td>{props.actionSlot(f)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default FlightsTable;
