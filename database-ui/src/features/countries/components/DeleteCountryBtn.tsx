import { jwtDecode } from "jwt-decode";
import { deleteCountry } from "../services/country-service";
import { Button } from "reactstrap";

interface DeleteCountryBtnProps {
  countryId: number;
  onDeleted: () => void;
}

function DeleteCountryBtn(props: DeleteCountryBtnProps) {
  const handleDeleteCountry = async () => {
    await deleteCountry(props.countryId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteCountry()}>
      Delete
    </Button>
  );
}

export default DeleteCountryBtn;
