import { jwtDecode } from "jwt-decode";
import { deleteService } from "../services/tservice-service";
import { Button } from "reactstrap";

interface DeleteServiceBtnProps {
  recordId: number;
  onDeleted: () => void;
}

function DeleteTServiceBtn(props: DeleteServiceBtnProps) {
  const handleDeleteService = async () => {
    await deleteService(props.recordId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteService()}>
      Delete
    </Button>
  );
}

export default DeleteTServiceBtn;
