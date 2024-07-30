import {
  createAgency,
  getAgency,
  updateAgency,
} from "../services/agency-service";
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

import { Agency } from "../models";
import { jwtDecode } from "jwt-decode";

const defaultAgency: Omit<Agency, "agencyId"> = {
  name: "",
};

interface EditAgencyBtnProps {
  agencyId?: number;
  onChange: () => void;
}

function EditAgencyBtn(props: EditAgencyBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [agency, setAgency] = useState<Omit<Agency, "agencyId">>();

  const initAgency = async () => {
    const initValue = props.agencyId
      ? await getAgency(props.agencyId)
      : defaultAgency;
    setAgency(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initAgency();
    else setAgency(undefined);
  };

  const handleSave = async () => {
    if (!agency) return;
    props.agencyId
      ? await updateAgency({ agencyId: props.agencyId, ...agency })
      : await createAgency(agency);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.agencyId ? "Update" : "Create";
  const actionColor = props.agencyId ? "warning" : "secondary";

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <>
      <Button color={actionColor} onClick={toggleModalVisibility}>
        {actionLabel}
      </Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>Update</ModalHeader>
        <ModalBody>
          {agency ? (
            <Form>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  value={agency.name}
                  onChange={(e) =>
                    setAgency({ ...agency, name: e.target.value })
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
          <Button color="primary" disabled={!agency} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditAgencyBtn;
