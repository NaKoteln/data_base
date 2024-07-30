import {
  createCountry,
  getCountry,
  updateCountry,
} from "../services/country-service";
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

import { Country } from "../models";
import { jwtDecode } from "jwt-decode";

const defaultCountry: Omit<Country, "countryId"> = {
  name: "",
};

interface EditCountryBtnProps {
  countryId?: number;
  onChange: () => void;
}

function EditCountryBtn(props: EditCountryBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [country, setCountry] = useState<Omit<Country, "countryId">>();

  const initCountry = async () => {
    const initValue = props.countryId
      ? await getCountry(props.countryId)
      : defaultCountry;
    setCountry(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initCountry();
    else setCountry(undefined);
  };

  const handleSave = async () => {
    if (!country) return;
    props.countryId
      ? await updateCountry({ countryId: props.countryId, ...country })
      : await createCountry(country);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.countryId ? "Update" : "Create";
  const actionColor = props.countryId ? "warning" : "secondary";

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
          {country ? (
            <Form>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  value={country.name}
                  onChange={(e) =>
                    setCountry({ ...country, name: e.target.value })
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
          <Button color="primary" disabled={!country} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditCountryBtn;
