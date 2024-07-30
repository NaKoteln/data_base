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
import { getReport } from "../services/report-service";
import { Report } from "../models";
import FlightsSelector from "../../../../features/flights/components/FlightsSelector";

interface CreateCategoryBtnProps {
  onCreated: (report: Report[]) => void;
}

function CreateReportBtn(props: CreateCategoryBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const [flightId, setFlightId] = useState(0);
  const [date, setDate] = useState(new Date());

  const handleCreateReport = async () => {
    const report = await getReport(flightId, date.toISOString());
    if (report) {
      props.onCreated(report);
      toggleModalVisibility();
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Button onClick={toggleModalVisibility}>Choose flight number and date</Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>Choose conditions</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Flight Number</Label>
              <FlightsSelector
                flightId={flightId}
                onSelected={(flightId) => {
                  setFlightId(flightId)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Flight date</Label>
              <Input
                type="date"
                placeholder="date placeholder"
                value={formatDate(new Date(date))}
                onChange={(e) =>
                  setDate(new Date(e.currentTarget.value))}
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
