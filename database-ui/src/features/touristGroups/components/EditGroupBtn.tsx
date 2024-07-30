import {
  createGroup,
  getGroup,
  updateGroup,
} from "../services/group-service";
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

import { Group } from "../models";
import CountriesSelector from "../../countries/components/CountriesSelector";
import { jwtDecode } from "jwt-decode";

const defaultGroup: Omit<Group, "groupId"> = {
  name: "",
  countryId: 0,
  checkInDate: new Date(),
  checkOutDate: new Date(),
};

interface EditGroupBtnProps {
  groupId?: number;
  onChange: () => void;
}

function EditGroupBtn(props: EditGroupBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [group, setGroup] = useState<Omit<Group, "groupId">>();

  const initGroup = async () => {
    const initValue = props.groupId
      ? await getGroup(props.groupId)
      : defaultGroup;
    setGroup(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initGroup();
    else setGroup(undefined);
  };

  const handleSave = async () => {
    if (!group) return;
    props.groupId
      ? await updateGroup({ groupId: props.groupId, ...group })
      : await createGroup(group);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.groupId ? "Update" : "Create";
  const actionColor = props.groupId ? "warning" : "secondary";

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

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
          {group ? (
            <Form>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  value={group.name}
                  onChange={(e) =>
                    setGroup({ ...group, name: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Country</Label>
                <CountriesSelector
                  countryId={group.countryId}
                  onSelected={(countryId) =>
                    setGroup({ ...group, countryId: countryId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Check in date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  value={formatDate(new Date(group.checkInDate))}
                  onChange={(e) =>
                    setGroup({ ...group, checkInDate: new Date(e.target.value) })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Check out date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  value={formatDate(new Date(group.checkOutDate))}
                  onChange={(e) =>
                    setGroup({ ...group, checkOutDate: new Date(e.target.value) })
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
          <Button color="primary" disabled={!group} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditGroupBtn;
