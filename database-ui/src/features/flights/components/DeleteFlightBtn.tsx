import { jwtDecode } from "jwt-decode";
import { deleteFlight } from "../services/flight-service";
import { Button } from "reactstrap";

interface DeleteFlightBtnProps {
  flightId: number;
  onDeleted: () => void;
}

function DeleteFlightBtn(props: DeleteFlightBtnProps) {
  const handleDeleteFlight = async () => {
    await deleteFlight(props.flightId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteFlight()}>
      Delete
    </Button>
  );
}

export default DeleteFlightBtn;
