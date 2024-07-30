import { jwtDecode } from "jwt-decode";
import { deleteDocument } from "../services/document-service";
import { Button } from "reactstrap";

interface DeleteDocumentBtnProps {
  documentId: number;
  onDeleted: () => void;
}

function DeleteDocumentBtn(props: DeleteDocumentBtnProps) {
  const handleDeleteDocument = async () => {
    await deleteDocument(props.documentId);
    props.onDeleted();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <Button color="danger" onClick={() => handleDeleteDocument()}>
      Delete
    </Button>
  );
}

export default DeleteDocumentBtn;
