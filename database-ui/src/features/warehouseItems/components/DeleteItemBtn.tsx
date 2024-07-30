import { jwtDecode } from "jwt-decode";
import { deleteItem } from "../services/warehouseItemss-service";
import { Button } from "reactstrap";

interface DeleteItemBtnProps {
  productId: number;
  onDeleted: () => void;
}

function DeleteItemBtn(props: DeleteItemBtnProps) {
  const handleDeleteItem = async () => {
    await deleteItem(props.productId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteItem()}>
      Delete
    </Button>
  );
}

export default DeleteItemBtn;
