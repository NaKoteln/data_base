import { jwtDecode } from "jwt-decode";
import { deleteRecord } from "../services/records-service";
import { Button } from "reactstrap";

interface DeleteRecordBtnProps {
  touristId: number;
  scheduleId: number;
  onDeleted: () => void;
}

function DeleteRecordBtn(props: DeleteRecordBtnProps) {
  const handleDeleteRecord = async () => {
    await deleteRecord(props.touristId, props.scheduleId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteRecord()}>
      Delete
    </Button>
  );
}

export default DeleteRecordBtn;
