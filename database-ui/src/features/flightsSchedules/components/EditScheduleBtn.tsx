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

import { FlightSchedule } from "../models";
import TouristsSelector from "../../tourists/components/ToristsSelector";
import FlightsSelector from "../../flights/components/FlightsSelector";
import CategoriesSelector from "./CategoriesSelector";
import { jwtDecode } from "jwt-decode";

const defaultSchedule: Omit<FlightSchedule, "scheduleId"> = {
  touristId: 0,
  flightNumber: 0,
  date: new Date(),
  flightType: "",
};

interface EditScheduleBtnProps {
  scheduleId?: number;
  onChange: () => void;
}

function EditScheduleBtn(props: EditScheduleBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [schedule, setSchedule] = useState<Omit<FlightSchedule, "scheduleId">>();

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
                <Label>Tourist</Label>
                <TouristsSelector
                  touristId={schedule.touristId}
                  onSelected={(touristId) =>
                    setSchedule({ ...schedule, touristId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Flight number</Label>
                  <FlightsSelector
                  flightId={schedule.flightNumber}
                  onSelected={(flightId) =>
                    setSchedule({ ...schedule, flightNumber: flightId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Flight date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  value={formatDate(new Date(schedule.date))}
                  onChange={(e) =>
                    setSchedule({ ...schedule, date: new Date(e.target.value) })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Flight type</Label>
                <CategoriesSelector
                  category={schedule.flightType}
                  onSelected={(category) => 
                    setSchedule({ ...schedule, flightType: (category == 0) ? "arrival" : "departure"})
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
          <Button color="primary" disabled={!schedule || !schedule.touristId || !schedule.flightNumber} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditScheduleBtn;
