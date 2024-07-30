import { jwtDecode } from "jwt-decode";
import { deleteSchedule } from "../services/schedule-service";
import { Button } from "reactstrap";

interface DeleteScheduleBtnProps {
  scheduleId: number;
  onDeleted: () => void;
}

function DeleteScheduleBtn(props: DeleteScheduleBtnProps) {
  const handleDeleteSchedule = async () => {
    await deleteSchedule(props.scheduleId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteSchedule()}>
      Delete
    </Button>
  );
}

export default DeleteScheduleBtn;
