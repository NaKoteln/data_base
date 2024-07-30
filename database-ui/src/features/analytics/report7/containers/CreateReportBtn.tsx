import {
  Button,
} from "reactstrap";
import { getReport } from "../services/report-service";
import { Report } from "../models";

interface CreateCategoryBtnProps {
  onCreated: (report: Report) => void;
}

function CreateReportBtn(props: CreateCategoryBtnProps) {

  const handleCreateReport = async () => {
    const report = await getReport();
    if (report) {
      props.onCreated(report);
    }
  };

  return (
    <>
      <Button onClick={handleCreateReport}>Get information</Button>
    </>
  );
}

export default CreateReportBtn;
