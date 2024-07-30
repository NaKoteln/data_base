import { useState } from "react";
import { Report } from "../models";
import ReportTable from "../containers/ReportTable";
import CreateReportBtn from "../containers/CreateReportBtn";

function Report10Page() {
  const [report, setReport] = useState<Report[]>([]);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Get a financial report</h3>
        <CreateReportBtn onCreated={setReport} />
      </div>
      {report && <ReportTable report={report}>
      </ReportTable>}
    </>
  );
}

export default Report10Page;
