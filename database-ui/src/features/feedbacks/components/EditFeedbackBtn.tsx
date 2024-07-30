import {
  createFeedback,
  getFeedback,
  updateFeedback,
} from "../services/feedback-service";
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

import { Feedback } from "../models";
import TouristsSelector from "../../tourists/components/ToristsSelector";
import ExcursionsSelector from "../../excursions/components/ExcursionsSelector";
import { jwtDecode } from "jwt-decode";

const defaultFeedback: Omit<Feedback, "recordId"> = {
  touristId: 0,
  excursionId: 0,
  estimation: 0,
  description: "",
};

interface EditFeedbackBtnProps {
  recordId?: number;
  onChange: () => void;
}

function EditFeedbackBtn(props: EditFeedbackBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState<Omit<Feedback, "recordId">>();

  const initFeedback = async () => {
    const initValue = props.recordId
      ? await getFeedback(props.recordId)
      : defaultFeedback;
    setFeedback(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initFeedback();
    else setFeedback(undefined);
  };

  const handleSave = async () => {
    if (!feedback) return;
    props.recordId
      ? await updateFeedback({ recordId: props.recordId, ...feedback })
      : await createFeedback(feedback);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.recordId ? "Update" : "Create";
  const actionColor = props.recordId ? "warning" : "secondary";

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
          {feedback ? (
            <Form>
              <FormGroup>
                <Label>Tourist</Label>
                <TouristsSelector
                  touristId={feedback.touristId}
                  onSelected={(touristId) =>
                    setFeedback({ ...feedback, touristId: touristId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Excursion</Label>
                <ExcursionsSelector
                  excursionId={feedback.excursionId}
                  onSelected={(excursionId) =>
                    setFeedback({ ...feedback, excursionId: excursionId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Estimation</Label>
                <Input
                  type="number"
                  value={feedback.estimation}
                  onChange={(e) =>
                    setFeedback({ ...feedback, estimation: (+e.target.value) })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  value={feedback.description}
                  onChange={(e) =>
                    setFeedback({ ...feedback, description: (e.target.value) })
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
          <Button color="primary" disabled={!feedback || !feedback.touristId || !feedback.excursionId} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditFeedbackBtn;
