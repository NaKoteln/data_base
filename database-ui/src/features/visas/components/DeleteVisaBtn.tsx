import { jwtDecode } from "jwt-decode";
import { deleteVisa } from "../services/visa-service";
import { Button } from "reactstrap";

interface DeleteVisaBtnProps {
  visaId: number;
  onDeleted: () => void;
}

function DeleteVisaBtn(props: DeleteVisaBtnProps) {
  const handleDeleteVisa = async () => {
    await deleteVisa(props.visaId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteVisa()}>
      Delete
    </Button>
  );
}

export default DeleteVisaBtn;
