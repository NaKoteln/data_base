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
import { createExcursion } from "../services/excursion-service";
import { Excursion } from "../models";
import AgenciesSelector from "../../agencies/components/AgenciesSelector";
import { jwtDecode } from "jwt-decode";

const defaultExcursion: Omit<Excursion, "excursionId"> = {
  agencyId: 0,
  name: "",
  cost: 500,
  maximumPeople: 25,
};

interface CreateExcursionBtnProps {
  onCreated: (value: Excursion) => void;
}

function CreateExcursionBtn(props: CreateExcursionBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [excursion, setExcursion] = useState(defaultExcursion);

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
    setExcursion(defaultExcursion);
  };

  const handleCreate = async () => {
    const newExcursion = await createExcursion(excursion);
    if (newExcursion.excursionId) {
      props.onCreated(newExcursion);
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
        <ModalHeader toggle={toggleModalVisibility}>
          Create excursion
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Agency</Label>
              <AgenciesSelector
                agencyId={excursion.agencyId}
                onSelected={(agencyId) =>
                  setExcursion({ ...excursion, agencyId })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Excursion name</Label>
              <Input
                value={excursion.name}
                onChange={(e) =>
                  setExcursion({ ...excursion, name: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Cost</Label>
              <Input
                type="number"
                value={excursion.cost}
                step={100}
                onChange={(e) =>
                  setExcursion({ ...excursion, cost: +e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Maximum people</Label>
              <Input
                type="number"
                value={excursion.maximumPeople}
                step={5}
                onChange={(e) =>
                  setExcursion({ ...excursion, maximumPeople: +e.target.value })
                }
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="gap-3">
          <Button color="secondary" onClick={toggleModalVisibility}>
            Cancel
          </Button>
          <Button color="primary" disabled={excursion.agencyId == 0} onClick={handleCreate}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CreateExcursionBtn;
