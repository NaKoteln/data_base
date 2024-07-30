import { jwtDecode } from "jwt-decode";
import { deleteBooking } from "../services/booking-service";
import { Button } from "reactstrap";

interface DeleteBookingBtnProps {
  bookingId: number;
  onDeleted: () => void;
}

function DeleteBookingBtn(props: DeleteBookingBtnProps) {
  const handleDeleteBooking = async () => {
    await deleteBooking(props.bookingId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteBooking()}>
      Delete
    </Button>
  );
}

export default DeleteBookingBtn;
