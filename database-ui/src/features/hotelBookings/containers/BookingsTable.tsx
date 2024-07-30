import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Booking } from "../models";
import HotelName from "../../hotels/components/HotelName";

interface BookingsTableProps {
  bookings: Booking[];
  actionSlot?: (p: Booking) => ReactNode;
  children?: ReactNode;
}

function BookingsTable(props: BookingsTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Tourist Id</th>
            <th>Check in date</th>
            <th>Check out date</th>
          </tr>
        </thead>
        <tbody>
          {props.bookings.map((b) => (
            <tr key={b.bookingId}>
              <td>{b.bookingId}</td>
              <td><HotelName hotelId={b.hotelId} /></td>
              <td>{b.touristId}</td>
              <td>{new Date(b.checkInDate).toISOString().split('T')[0]}</td>
              <td>{new Date(b.checkOutDate).toISOString().split('T')[0]}</td>
              {props.actionSlot && <td>{props.actionSlot(b)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default BookingsTable;
