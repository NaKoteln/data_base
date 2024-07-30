import { jwtDecode } from "jwt-decode";
import { deleteFeedback } from "../services/feedback-service";
import { Button } from "reactstrap";

interface DeleteFeedbackBtnProps {
  recordId: number;
  onDeleted: () => void;
}

function DeleteFeedbackBtn(props: DeleteFeedbackBtnProps) {
  const handleDeleteFeedback = async () => {
    await deleteFeedback(props.recordId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteFeedback()}>
      Delete
    </Button>
  );
}

export default DeleteFeedbackBtn;
