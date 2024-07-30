import { jwtDecode } from "jwt-decode";
import { deletePurchase } from "../services/purchase-service";
import { Button } from "reactstrap";

interface DeletePurchaseBtnProps {
  purchaseId: number;
  onDeleted: () => void;
}

function DeletePurchaseBtn(props: DeletePurchaseBtnProps) {
  const handleDeletePurchase = async () => {
    await deletePurchase(props.purchaseId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeletePurchase()}>
      Delete
    </Button>
  );
}

export default DeletePurchaseBtn;
