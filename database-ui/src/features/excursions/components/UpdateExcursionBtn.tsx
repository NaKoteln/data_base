import { jwtDecode } from "jwt-decode";
import { updateExcursion } from "../services/excursion-service";
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

interface UpdateExcursionBtnProps {
    excursionId: number;
    onUpdated: () => void;
}

function UpdateExcursionBtn(props: UpdateExcursionBtnProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModalVisibility = () => setModalVisible(!modalVisible);

    const [agencyId, setAgencyId] = useState(1);
    const [name, setName] = useState("");
    const [cost, setCost] = useState(500);
    const [maxPeople, setMaxPeople] = useState(25);

    const handleUpdateExcursion = async () => {
        await updateExcursion(props.excursionId, { agencyId, name, cost, maximumPeople: maxPeople });
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
                <ModalHeader toggle={toggleModalVisibility}>Update excursion</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Agency name</Label>
                            <Input
                                type="number"
                                value={agencyId}
                                step={1}
                                onChange={(e) => setAgencyId(+e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Excursion name</Label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Cost</Label>
                            <Input
                                type="number"
                                value={cost}
                                step={100}
                                onChange={(e) => setCost(+e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Maximum people</Label>
                            <Input
                                type="number"
                                value={maxPeople}
                                step={5}
                                onChange={(e) => setMaxPeople(+e.target.value)}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter className="gap-3">
                    <Button color="secondary" onClick={toggleModalVisibility}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleUpdateExcursion}>
                        Update
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default UpdateExcursionBtn;
