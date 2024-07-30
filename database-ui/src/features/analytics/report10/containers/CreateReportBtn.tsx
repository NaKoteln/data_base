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
import GroupsSelector from "../../../../features/touristGroups/components/GroupsSelector";

interface CreateCategoryBtnProps {
  onCreated: (report: Report[]) => void;
}

function CreateReportBtn(props: CreateCategoryBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const [groupId, setGroupId] = useState(0);
  const [category, setCategory] = useState("");

  const handleCreateReport = async () => {
    const report = await getReport(category, groupId);
    if (report) {
      props.onCreated(report);
      toggleModalVisibility();
    }
  };

  return (
    <>
      <Button onClick={toggleModalVisibility}>Choose group and category</Button>
      <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
        <ModalHeader toggle={toggleModalVisibility}>Choose options</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Group</Label>
              <GroupsSelector
                groupId={groupId}
                onSelected={(groupId) => {
                  setGroupId(groupId)
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
