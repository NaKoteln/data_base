import { jwtDecode } from "jwt-decode";
import { updateFlight } from "../services/flight-service";
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

interface UpdateFlightBtnProps {
    flightId: number;
    onUpdated: () => void;
}

function UpdateFlightBtn(props: UpdateFlightBtnProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModalVisibility = () => setModalVisible(!modalVisible);

    const [seatsNumber, setSeatsNumber] = useState(150);
    const [cargoSeats, setCargoSeats] = useState(50);

    const handleUpdateFlight = async () => {
        await updateFlight(props.flightId, { seatsNumber, cargoSeats });
        props.onUpdated();
        toggleModalVisibility();
    };

    const token = sessionStorage.getItem("token");
    const user: { role: string } = jwtDecode(token ?? "");
    if (user.role == "reader") return null;

    return (
        <>
            <Button color="warning" onClick={toggleModalVisibility}>Update</Button>
            <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
                <ModalHeader toggle={toggleModalVisibility}>Update</ModalHeader>
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
                    <Button color="primary" onClick={handleUpdateFlight}>
                        Update
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default UpdateFlightBtn;
