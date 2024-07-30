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
import CategoriesSelector from "./CategoriesSelectorBtn";
import { getReport } from "../services/report-service";
import HotelNameSelector from "./CountryNameSelector";
import { Report } from "../models";

interface CreateCategoryBtnProps {
  onCreated: (report: Report) => void;
}

function CreateReportBtn(props: CreateCategoryBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleCreateReport = async () => {
    const report = await getReport(category, country, startDate.toISOString(), endDate.toISOString());
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
      <Button onClick={toggleModalVisibility}>Choose conditions</Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>Choose category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Country</Label>
              <HotelNameSelector
                countryName={country}
                onSelected={(country) => {
                  setCountry(country)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <CategoriesSelector
                category={category}
                onSelected={(categoryId) => {
                  let category;
                  if (categoryId === 0) category = "child"
                  else if (categoryId === 1) category = "shop"
                  else if (categoryId == 3) category = ""
                  else category = "rest";
                  setCategory(category)
                }}
              />
            </FormGroup>
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
                  setEndDate(new Date(e.currentTarget.value))
                }
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
