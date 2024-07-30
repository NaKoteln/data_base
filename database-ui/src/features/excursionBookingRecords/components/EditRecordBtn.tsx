import {
  createRecord,
  getRecord,
  updateRecord,
} from "../services/records-service";
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

import { Record } from "../models";
import TouristsSelector from "../../tourists/components/ToristsSelector";
import SchedulesSelector from "../../excursionShedules/components/SchedulesSelector";
import { jwtDecode } from "jwt-decode";

const defaultRecord: Record = {
  touristId: 0,
  scheduleId: 0,
};

interface EditRecordBtnProps {
  touristId?: number;
  scheduleId?: number;
  onChange: () => void;
}

function EditRecordBtn(props: EditRecordBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState<Record>();

  const initRecord = async () => {
    const initValue = (props.touristId && props.scheduleId)
      ? await getRecord(props.touristId, props.scheduleId)
      : defaultRecord;
    setRecord(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initRecord();
    else setRecord(undefined);
  };

  const handleSave = async () => {
    if (!record) return;
    (props.touristId && props.scheduleId)
      ? await updateRecord({ touristId: props.touristId, scheduleId: props.scheduleId }, { ...record })
      : await createRecord(record);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = (props.touristId && props.scheduleId) ? "Update" : "Create";
  const actionColor = (props.touristId && props.scheduleId) ? "warning" : "secondary";

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
          {record ? (
            <Form>
              <FormGroup>
                <Label>Tourist</Label>
                <TouristsSelector
                  touristId={record.touristId}
                  onSelected={(touristId) =>
                    setRecord({ ...record, touristId: touristId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Schedule</Label>
                <SchedulesSelector
                  scheduleId={record.scheduleId}
                  onSelected={(scheduleId) =>
                    setRecord({ ...record, scheduleId: scheduleId })
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
          <Button color="primary" disabled={!record || !record.touristId || !record.scheduleId} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditRecordBtn;
