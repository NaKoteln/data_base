import { jwtDecode } from "jwt-decode";
import { deleteService } from "../services/service-service";
import { Button } from "reactstrap";

interface DeleteServiceBtnProps {
  serviceId: number;
  onDeleted: () => void;
}

function DeleteServiceBtn(props: DeleteServiceBtnProps) {
  const handleDeleteService = async () => {
    await deleteService(props.serviceId);
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

export default DeleteServiceBtn;
