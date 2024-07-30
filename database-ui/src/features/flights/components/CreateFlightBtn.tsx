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
import { createFlight } from "../services/flight-service";
import { Flight } from "../models";
import { jwtDecode } from "jwt-decode";

interface CreateFlightBtnProps {
  onCreated: (flight: Flight) => void;
}

function CreateFlightBtn(props: CreateFlightBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const [seatsNumber, setSeatsNumber] = useState(150);
  const [cargoSeats, setCargoSeats] = useState(50);

  const handleCreateFlight = async () => {
    const flight = await createFlight({ seatsNumber, cargoSeats });
    if (flight.flightId) {
      props.onCreated(flight);
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
        <ModalHeader toggle={toggleModalVisibility}>Create flight</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Seats number</Label>
              <Input
                type="number"
                value={seatsNumber}
                step={20}
                onChange={(e) => setSeatsNumber(+e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Cargo seats number</Label>
              <Input
                type="number"
                value={cargoSeats}
                step={10}
                onChange={(e) => setCargoSeats(+e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="gap-3">
          <Button color="secondary" onClick={toggleModalVisibility}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleCreateFlight}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CreateFlightBtn;
