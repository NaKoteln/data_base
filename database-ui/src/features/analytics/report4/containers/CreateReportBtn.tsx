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
import CountriesSelector from "./CountryNameSelector";
import TouristsSelector from "../../../../features/tourists/components/ToristsSelector";

interface CreateCategoryBtnProps {
  onCreated: (report: Report) => void;
}

function CreateReportBtn(props: CreateCategoryBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const [country, setCountry] = useState("");
  const [touristId, setTouristId] = useState(0);

  const handleCreateReport = async () => {
    const report = await getReport(country, touristId);
    if (report) {
      props.onCreated(report);
      toggleModalVisibility();
    }
  };

  return (
    <>
      <Button onClick={toggleModalVisibility}>Choose country and tourist</Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>Choose category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Country</Label>
              <CountriesSelector
                countryName={country}
                onSelected={(country) => {
                  setCountry(country)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Tourist</Label>
              <TouristsSelector
                touristId={touristId}
                onSelected={(touristId) => {
                  setTouristId(touristId)
                }}
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
