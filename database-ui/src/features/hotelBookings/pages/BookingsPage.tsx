import { useEffect, useState } from "react";
import { Booking } from "../models";
import { getBookings } from "../services/booking-service";
import BookingsTable from "../containers/BookingsTable";
import DeleteBookingBtn from "../components/DeleteBookingBtn";
import EditBookingBtn from "../components/EditBookingBtn";

function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const initBookings = () => {
    getBookings().then((data) => setBookings(data));
  };

  useEffect(() => {
    initBookings();
  }, []);

  return (
    <>
      <BookingsTable
        bookings={bookings}
        actionSlot={(b) => (
          <div className="text-end">
            <EditBookingBtn bookingId={b.bookingId} onChange={initBookings} />{" "}
            <DeleteBookingBtn bookingId={b.bookingId} onDeleted={initBookings} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Hotels booking</h3>
          <EditBookingBtn onChange={initBookings} />
        </div>
      </BookingsTable>
    </>
  );
}

export default BookingsPage;
