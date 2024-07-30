import { useEffect, useState } from "react";
import { Record } from "../models";
import { getRecords } from "../services/records-service";
import RecordsTable from "../containers/RecordsTable";
import DeleteRecordBtn from "../components/DeleteRecordBtn";
import EditRecordBtn from "../components/EditRecordBtn";

function RecordsPage() {
  const [records, setRecords] = useState<Record[]>([]);

  const initRecords = () => {
    getRecords().then((data) => setRecords(data));
  };

  useEffect(() => {
    initRecords();
  }, []);

  return (
    <>
      <RecordsTable
        records={records}
        actionSlot={(r) => (
          <div className="text-end">
            <EditRecordBtn touristId={r.touristId} scheduleId={r.scheduleId} onChange={initRecords} />{" "}
            <DeleteRecordBtn touristId={r.touristId} scheduleId={r.scheduleId} onDeleted={initRecords} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Excursions booking records</h3>
          <EditRecordBtn onChange={initRecords} />
        </div>
      </RecordsTable>
    </>
  );
}

export default RecordsPage;
