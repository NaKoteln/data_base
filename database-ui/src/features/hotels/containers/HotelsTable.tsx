import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Hotel } from "../models";

interface HotelsTableProps {
  hotels: Hotel[];
  actionSlot?: (h: Hotel) => ReactNode;
  children?: ReactNode;
}

function HotelsTable(props: HotelsTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Night cost</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.hotels.map((h) => (
            <tr key={h.hotelId}>
              <td>{h.hotelId}</td>
              <td>{h.name}</td>
              <td>{h.nightCost}</td>
              {props.actionSlot && <td>{props.actionSlot(h)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default HotelsTable;
