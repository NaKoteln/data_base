import { jwtDecode } from "jwt-decode";
import { deletePeople } from "../services/people-service";
import { Button } from "reactstrap";

interface DeletePeopleBtnProps {
  peopleId: number;
  onDeleted: () => void;
}

function DeletePeopleBtn(props: DeletePeopleBtnProps) {
  const handleDeletePeople = async () => {
    await deletePeople(props.peopleId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeletePeople()}>
      Delete
    </Button>
  );
}

export default DeletePeopleBtn;
