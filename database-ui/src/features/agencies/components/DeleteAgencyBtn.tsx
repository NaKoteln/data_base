import { jwtDecode } from "jwt-decode";
import { deleteAgency } from "../services/agency-service";
import { Button } from "reactstrap";

interface DeleteAgencyBtnProps {
  agencyId: number;
  onDeleted: () => void;
}

function DeleteAgencyBtn(props: DeleteAgencyBtnProps) {
  const handleDeleteAgency = async () => {
    await deleteAgency(props.agencyId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteAgency()}>
      Delete
    </Button>
  );
}

export default DeleteAgencyBtn;
