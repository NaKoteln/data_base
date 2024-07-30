import { useState } from "react";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getReport } from "../services/report-service";
import { Report } from "../models";
import FlightsSelector from "../../../../features/flights/components/FlightsSelector";

interface CreateReportBtnProps {
  onCreated: (report: Report[]) => void;
}

function CreateReportBtn(props: CreateReportBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const [flight, setFlight] = useState(0);

  const handleCreateReport = async () => {
    const report = await getReport(flight);
    if (report) {
      props.onCreated(report);
      toggleModalVisibility();
    }
  };

  return (
    <>
      <Button onClick={toggleModalVisibility}>Choose flight number</Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>Choose conditions</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Flight Number</Label>
              <FlightsSelector
                flightId={flight}
                onSelected={(flight) =>
                  setFlight(flight)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="gap-3">
          <Button color="secondary" onClick={toggleModalVisibility}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleCreateReport}>
            Choose
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CreateReportBtn;
