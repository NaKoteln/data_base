import { useState } from "react";
import ReportTable from "../containers/ReportTable";
import CreateReportBtn from "../containers/CreateReportBtn";
import { Report } from "../models";

function Report13Page() {
  const [report, setReport] = useState<Report>();

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>TProfitability of the representative office for the period</h3>
        <CreateReportBtn onCreated={setReport} />
      </div>
      {report && <ReportTable report={report}>
      </ReportTable>}
    </>
  );
}

export default Report13Page;
