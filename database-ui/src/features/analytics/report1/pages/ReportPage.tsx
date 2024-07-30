import { useState } from "react";
import { Report } from "../models";
import ReportTable from "../containers/ReportTable";
import CreateReportBtn from "../containers/CreateReportBtn";

function Report1Page() {
  const [report, setReport] = useState<Report[]>([]);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Getting tourists by category</h3>
        <CreateReportBtn onCreated={setReport} />
      </div>
      {report && <ReportTable report={report}>
      </ReportTable>}
    </>
  );
}

export default Report1Page;
