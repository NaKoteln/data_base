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
import { createService } from "../services/service-service";
import { Service } from "../models";
import { jwtDecode } from "jwt-decode";

interface CreateServiceBtnProps {
  onCreated: (Service: Service) => void;
}

function CreateServiceBtn(props: CreateServiceBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);

  const handleCreateService = async () => {
    const service = await createService({ name, cost, isDeleted: false });
    if (service.serviceId) {
      props.onCreated(service);
      toggleModalVisibility();
    }
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <>
      <Button onClick={toggleModalVisibility}>Create</Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>Create service</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Service Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Service cost</Label>
              <Input
                type="number"
                value={cost}
                step={1000}
                onChange={(e) => setCost(+e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="gap-3">
          <Button color="secondary" onClick={toggleModalVisibility}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleCreateService}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CreateServiceBtn;
