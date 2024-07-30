import { jwtDecode } from "jwt-decode";
import { deleteExcursion } from "../services/excursion-service";
import { Button } from "reactstrap";

interface DeleteExcursionBtnProps {
  excursionId: number;
  onDeleted: () => void;
}

function DeleteExcursionBtn(props: DeleteExcursionBtnProps) {
  const handleDeleteExcursion = async () => {
    await deleteExcursion(props.excursionId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteExcursion()}>
      Delete
    </Button>
  );
}

export default DeleteExcursionBtn;
