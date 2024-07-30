import { jwtDecode } from "jwt-decode";
import { deleteGroup } from "../services/group-service";
import { Button } from "reactstrap";

interface DeleteGroupBtnProps {
  groupId: number;
  onDeleted: () => void;
}

function DeleteGroupBtn(props: DeleteGroupBtnProps) {
  const handleDeleteGroup = async () => {
    await deleteGroup(props.groupId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteGroup()}>
      Delete
    </Button>
  );
}

export default DeleteGroupBtn;
