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

interface CreateReportBtnProps {
  onCreated: (report: Report) => void;
}

function CreateReportBtn(props: CreateReportBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleCreateReport = async () => {
    const report = await getReport(startDate.toISOString(), endDate.toISOString());
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
      <Button onClick={toggleModalVisibility}>Choose start and end date</Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>Choose conditions</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Start date</Label>
              <Input
                type="date"
                placeholder="date placeholder"
                value={formatDate(new Date(startDate))}
                onChange={(e) =>
                  setStartDate(new Date(e.currentTarget.value))}
              />
            </FormGroup>
            <FormGroup>
              <Label>End date</Label>
              <Input
                type="date"
                placeholder="date placeholder"
                value={formatDate(new Date(endDate))}
                onChange={(e) =>
                  setEndDate(new Date(e.currentTarget.value))}
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
