import { useState } from "react";
import { Report } from "../models";
import ReportTable from "../containers/ReportTable";
import CreateReportBtn from "../containers/CreateReportBtn";

function Report4Page() {
  const [report, setReport] = useState<Report>();

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Get information about a tourist in a specific country</h3>
        <CreateReportBtn onCreated={setReport} />
      </div>
      {report && <ReportTable report={report}>
      </ReportTable>}
    </>
  );
}

export default Report4Page;
