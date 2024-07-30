import {
  createTourist,
  getTourist,
  updateTourist,
} from "../services/tourist-service";
import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import { Tourist } from "../models";
import PeoplesSelector from "../../peoples/components/PeoplesSelector";
import GroupsSelector from "../../touristGroups/components/GroupsSelector";
import CategoriesSelector from "./CategoriesSelector";
import { jwtDecode } from "jwt-decode";

const defaultTourist: Omit<Tourist, "touristId"> = {
  peopleId: 0,
  groupId: 0,
  category: "",
};

interface EditTouristBtnProps {
  touristId?: number;
  onChange: () => void;
}

function EditTouristBtn(props: EditTouristBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tourist, setTourist] = useState<Omit<Tourist, "touristId">>();

  const initTourist = async () => {
    const initValue = props.touristId
      ? await getTourist(props.touristId)
      : defaultTourist;
    setTourist(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initTourist();
    else setTourist(undefined);
  };

  const handleSave = async () => {
    if (!tourist) return;
    props.touristId
      ? await updateTourist({ touristId: props.touristId, ...tourist })
      : await createTourist(tourist);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.touristId ? "Update" : "Create";
  const actionColor = props.touristId ? "warning" : "secondary";

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
          {tourist ? (
            <Form>
              <FormGroup>
                <Label>People</Label>
                <PeoplesSelector
                  peopleId={tourist.peopleId}
                  onSelected={(peopleId) =>
                    setTourist({ ...tourist, peopleId: peopleId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Group</Label>
                <GroupsSelector
                  groupId={tourist.groupId}
                  onSelected={(groupId) =>
                    setTourist({ ...tourist, groupId: groupId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Category</Label>
                <CategoriesSelector
                  category={tourist.category}
                  onSelected={(categoryId) => {
                    let category;
                    if (categoryId === 0) category = "child" 
                    else if (categoryId === 1) category = "shop"
                    else category = "rest";
                    setTourist({ ...tourist, category: category })
                  }}
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
          <Button color="primary" disabled={!tourist || !tourist.peopleId || !tourist.groupId} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditTouristBtn;
