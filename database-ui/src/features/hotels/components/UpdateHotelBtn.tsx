// import { Hotel } from "../models";
import { jwtDecode } from "jwt-decode";
import { updateHotel } from "../services/hotels-service";
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

interface UpdateHotelBtnProps {
  hotelId: number;
  onUpdated: () => void;
}

function UpdateHotelBtn(props: UpdateHotelBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const [name, setName] = useState("");
  const [nightCost, setNightCost] = useState(100);

  const handleUpdateHotel = async () => {
    await updateHotel(props.hotelId, { name, nightCost });
    props.onUpdated();
    toggleModalVisibility();
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <>
      <Button color="warning" onClick={toggleModalVisibility}>
        Update
      </Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>Update</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>Night cost</Label>
              <Input
                type="number"
                value={nightCost}
                step={100}
                onChange={(e) => setNightCost(+e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="gap-3">
          <Button color="secondary" onClick={toggleModalVisibility}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpdateHotel}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UpdateHotelBtn;
