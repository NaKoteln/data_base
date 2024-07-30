import {
  createSchedule,
  getSchedule,
  updateSchedule,
} from "../services/schedule-service";
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

import { ExcursionSchedule } from "../models";
import ExcursionsSelector from "../../excursions/components/ExcursionsSelector";
import { jwtDecode } from "jwt-decode";

const defaultSchedule: Omit<ExcursionSchedule, "scheduleId"> = {
  excursionId: 0,
  excursionDate: new Date(),
  startTime: "",
  endTime: "",
};

interface EditScheduleBtnProps {
  scheduleId?: number;
  onChange: () => void;
}

function EditScheduleBtn(props: EditScheduleBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [schedule, setSchedule] = useState<Omit<ExcursionSchedule, "scheduleId">>();

  const initSchedule = async () => {
    const initValue = props.scheduleId
      ? await getSchedule(props.scheduleId)
      : defaultSchedule;
    setSchedule(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initSchedule();
    else setSchedule(undefined);
  };

  const handleSave = async () => {
    if (!schedule) return;
    props.scheduleId
      ? await updateSchedule({ scheduleId: props.scheduleId, ...schedule })
      : await createSchedule(schedule);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.scheduleId ? "Update" : "Create";
  const actionColor = props.scheduleId ? "warning" : "secondary";

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
          {schedule ? (
            <Form>
              <FormGroup>
                <Label>Excursion</Label>
                <ExcursionsSelector
                  excursionId={schedule.excursionId}
                  onSelected={(excursionId) =>
                    setSchedule({ ...schedule, excursionId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Excursion date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  value={formatDate(new Date(schedule.excursionDate))}
                  onChange={(e) =>
                    setSchedule({ ...schedule, excursionDate: new Date(e.target.value) })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Start time</Label>
                <Input
                  type="time"
                  value={schedule.startTime}
                  onChange={(e) =>
                    setSchedule({ ...schedule, startTime: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>End time</Label>
                <Input
                  type="time"
                  value={schedule.endTime}
                  onChange={(e) =>
                    setSchedule({ ...schedule, endTime: e.target.value })
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
          <Button color="primary" disabled={!schedule || schedule.excursionId == 0} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditScheduleBtn;
