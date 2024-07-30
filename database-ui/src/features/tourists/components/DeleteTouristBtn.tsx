import { jwtDecode } from "jwt-decode";
import { deleteTourist } from "../services/tourist-service";
import { Button } from "reactstrap";

interface DeleteTouristBtnProps {
  touristId: number;
  onDeleted: () => void;
}

function DeleteTouristBtn(props: DeleteTouristBtnProps) {
  const handleDeleteTourist = async () => {
    await deleteTourist(props.touristId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteTourist()}>
      Delete
    </Button>
  );
}

export default DeleteTouristBtn;
