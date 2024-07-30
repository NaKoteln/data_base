import {
  createService,
  getService,
  updateService,
} from "../services/tservice-service";
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

import { Service } from "../models";
import TouristsSelector from "../../tourists/components/ToristsSelector";
import ServicesSelector from "../../services/components/ServicesSelector";
import { jwtDecode } from "jwt-decode";

const defaultService: Omit<Service, "recordId"> = {
  touristId: 0,
  serviceId: 0,
  date: new Date(),
};

interface EditTServiceBtnProps {
  recordId?: number;
  onChange: () => void;
}

function EditTServiceBtn(props: EditTServiceBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [service, setService] = useState<Omit<Service, "recordId">>();

  const initService = async () => {
    const initValue = props.recordId
      ? await getService(props.recordId)
      : defaultService;
    setService(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initService();
    else setService(undefined);
  };

  const handleSave = async () => {
    if (!service) return;
    props.recordId
      ? await updateService({ recordId: props.recordId, ...service })
      : await createService(service);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.recordId ? "Update" : "Create";
  const actionColor = props.recordId ? "warning" : "secondary";

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
          {service ? (
            <Form>
              <FormGroup>
                <Label>Tourist</Label>
                <TouristsSelector
                  touristId={service.touristId}
                  onSelected={(touristId) =>
                    setService({ ...service, touristId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Service</Label>
                <ServicesSelector
                  serviceId={service.serviceId}
                  onSelected={(serviceRecordId) =>
                    setService({ ...service, serviceId: serviceRecordId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Service date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  value={formatDate(new Date(service.date))}
                  onChange={(e) =>
                    setService({ ...service, date: new Date(e.target.value) })
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
          <Button color="primary" disabled={!service || !service.touristId || !service.serviceId} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditTServiceBtn;
