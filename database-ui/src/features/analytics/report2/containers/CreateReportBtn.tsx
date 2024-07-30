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
import CategoriesSelector from "./CategoriesSelectorBtn";
import { getReport } from "../services/report-service";
import { Report } from "../models";
import HotelNameSelector from "./HotelNameSelector";

interface CreateCategoryBtnProps {
  onCreated: (report: Report[]) => void;
}

function CreateReportBtn(props: CreateCategoryBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const [category, setCategory] = useState("");
  const [hotel, setHotel] = useState("");

  const handleCreateReport = async () => {
    const report = await getReport(category, hotel);
    if (report) {
      props.onCreated(report);
      toggleModalVisibility();
    }
  };

  return (
    <>
      <Button onClick={toggleModalVisibility}>Choose hotel and category</Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>Choose category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Hotel</Label>
              <HotelNameSelector
                hotelName={hotel}
                onSelected={(hotelName) => {
                  setHotel(hotelName)
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
