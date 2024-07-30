import { useState } from "react";
import ReportTable from "../containers/ReportTable";
import CreateReportBtn from "../containers/CreateReportBtn";
import { Report } from "../models";

function Report3Page() {
  const [report, setReport] = useState<Report>();

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>The number of tourists in the country during the period</h3>
        <CreateReportBtn onCreated={setReport} />
      </div>
      {report && <ReportTable report={report}>
      </ReportTable>}
    </>
  );
}

export default Report3Page;
