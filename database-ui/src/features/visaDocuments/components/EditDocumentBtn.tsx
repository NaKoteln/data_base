import {
  createDocument,
  getDocument,
  updateDocument,
} from "../services/document-service";
import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import { Document } from "../models";
import VisasSelector from "../../visas/components/VisasSelector";
import { jwtDecode } from "jwt-decode";

const defaultDocument: Omit<Document, "documentId"> = {
  visaId: 0,
  name: "",
  content: "",
};

interface EditDocumentBtnProps {
  documentId?: number;
  onChange: () => void;
}

function EditDocumentBtn(props: EditDocumentBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [document, setDocument] = useState<Omit<Document, "documentId">>();

  const initDocument = async () => {
    const initValue = props.documentId
      ? await getDocument(props.documentId)
      : defaultDocument;
    setDocument(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initDocument();
    else setDocument(undefined);
  };

  const handleSave = async () => {
    if (!document) return;
    props.documentId
      ? await updateDocument({ documentId: props.documentId, ...document })
      : await createDocument(document);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.documentId ? "Update" : "Create";
  const actionColor = props.documentId ? "warning" : "secondary";

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <>
      <Button color={actionColor} onClick={toggleModalVisibility}>
        {actionLabel}
      </Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>{actionLabel}</ModalHeader>
        <ModalBody>
          {document ? (
            <Form>
              <FormGroup>
                <Label>Visa</Label>
                <VisasSelector
                  visaId={document.visaId}
                  onSelected={(visaId) =>
                    setDocument({ ...document, visaId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Document name</Label>
                <Input
                  value={document.name}
                  onChange={(e) =>
                    setDocument({ ...document, name: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Document content</Label>
                <Input
                  value={document.content}
                  onChange={(e) =>
                    setDocument({ ...document, content: e.target.value })
                  }
                />
              </FormGroup>
            </Form>
          ) : (
            "Loading..."
          )}
        </ModalBody>
        <ModalFooter className="gap-3">
          <Button color="secondary" onClick={toggleModalVisibility}>
            Cancel
          </Button>
          <Button color="primary" disabled={!document || !document.visaId} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditDocumentBtn;
