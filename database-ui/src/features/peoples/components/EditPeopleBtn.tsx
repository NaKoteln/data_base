import {
  createPeople,
  getPeople,
  updatePeople,
} from "../services/people-service";
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

import { People } from "../models";
import GendersSelector from "./GenderSelector";
import { jwtDecode } from "jwt-decode";

const defaultPeople: Omit<People, "peopleId"> = {
  lastName: "",
  firstName: "",
  middleName: "",
  passportData: 111111,
  gender: false,
};

interface EditPeopleBtnProps {
  peopleId?: number;
  onChange: () => void;
}

function EditPeopleBtn(props: EditPeopleBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [people, setPeople] = useState<Omit<People, "peopleId">>();

  const initPeople = async () => {
    const initValue = props.peopleId
      ? await getPeople(props.peopleId)
      : defaultPeople;
    setPeople(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initPeople();
    else setPeople(undefined);
  };

  const handleSave = async () => {
    if (!people) return;
    props.peopleId
      ? await updatePeople({ peopleId: props.peopleId, ...people })
      : await createPeople(people);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.peopleId ? "Update" : "Create";
  const actionColor = props.peopleId ? "warning" : "secondary";

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
          {people ? (
            <Form>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  value={people.lastName}
                  onChange={(e) =>
                    setPeople({ ...people, lastName: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  value={people.firstName}
                  onChange={(e) =>
                    setPeople({ ...people, firstName: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Middle Name</Label>
                <Input
                  value={people.middleName}
                  onChange={(e) =>
                    setPeople({ ...people, middleName: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Passport data</Label>
                <Input
                  type="number"
                  value={people.passportData}
                  onChange={(e) =>
                    setPeople({ ...people, passportData: (+e.target.value) })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Gender</Label>
                <GendersSelector
                  gender={people.gender}
                  onSelected={(gender) => 
                    setPeople({ ...people, gender: (gender == 1) ? true : false }
                    )
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
          <Button color="primary" disabled={!people} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditPeopleBtn;
