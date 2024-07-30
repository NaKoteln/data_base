import {
  createVisa,
  getVisa,
  updateVisa,
} from "../services/visa-service";
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

import { Visa } from "../models";
import TouristsSelector from "../../tourists/components/ToristsSelector";
import CountriesSelector from "../../countries/components/CountriesSelector";
import { jwtDecode } from "jwt-decode";

const defaultVisa: Omit<Visa, "visaId"> = {
  touristId: 0,
  country: 0,
  issueDate: new Date(),
  expirationDate: new Date(),
};

interface EditVisaBtnProps {
  visaId?: number;
  onChange: () => void;
}

function EditVisaBtn(props: EditVisaBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [visa, setVisa] = useState<Omit<Visa, "visaId">>();

  const initVisa = async () => {
    const initValue = props.visaId
      ? await getVisa(props.visaId)
      : defaultVisa;
    setVisa(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initVisa();
    else setVisa(undefined);
  };

  const handleSave = async () => {
    if (!visa) return;
    props.visaId
      ? await updateVisa({ visaId: props.visaId, ...visa })
      : await createVisa(visa);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.visaId ? "Update" : "Create";
  const actionColor = props.visaId ? "warning" : "secondary";

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
          {visa ? (
            <Form>
              <FormGroup>
                <Label>Tourist</Label>
                <TouristsSelector
                  touristId={visa.touristId}
                  onSelected={(touristId) =>
                    setVisa({ ...visa, touristId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Country</Label>
                <CountriesSelector
                  countryId={visa.country}
                  onSelected={(country) =>
                    setVisa({ ...visa, country })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Issue date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  value={formatDate(new Date(visa.issueDate))}
                  onChange={(e) =>
                    setVisa({ ...visa, issueDate: new Date(e.target.value) })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Expiration date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  value={formatDate(new Date(visa.expirationDate))}
                  onChange={(e) =>
                    setVisa({ ...visa, expirationDate: new Date(e.target.value) })
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
          <Button color="primary" disabled={!visa || !visa.touristId || !visa.country} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditVisaBtn;
