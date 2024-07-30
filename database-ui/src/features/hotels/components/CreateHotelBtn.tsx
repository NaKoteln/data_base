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
import { createHotel } from "../services/hotels-service";
import { Hotel } from "../models";
import { jwtDecode } from "jwt-decode";

interface CreateHotelBtnProps {
  onCreated: (hotel: Hotel) => void;
}

function CreateHotelBtn(props: CreateHotelBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const [name, setName] = useState("");
  const [nightCost, setNightCost] = useState(100);

  const handleCreateHotel = async () => {
    const hotel = await createHotel({ name, nightCost });
    if (hotel.hotelId) {
      props.onCreated(hotel);
      toggleModalVisibility();
    }
  };

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");
  if (user.role == "reader") return null;

  return (
    <>
      <Button onClick={toggleModalVisibility}>Create</Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>Create hotel</ModalHeader>
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
          <Button color="primary" onClick={handleCreateHotel}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CreateHotelBtn;
