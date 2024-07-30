import { jwtDecode } from "jwt-decode";
import { deleteHotel } from "../services/hotels-service";
import { Button } from "reactstrap";

interface DeleteHotelBtnProps {
  hotelId: number;
  onDeleted: () => void;
}

function DeleteHotelBtn(props: DeleteHotelBtnProps) {
  const handleDeleteHotel = async () => {
    await deleteHotel(props.hotelId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteHotel()}>
      Delete
    </Button>
  );
}

export default DeleteHotelBtn;
