import { useEffect, useState } from "react";
import { ExcursionSchedule } from "../models";
import { getSchedules } from "../services/schedule-service";
import SchedulesTable from "../containers/SchedulesTable";
import DeleteScheduleBtn from "../components/DeleteScheduleBtn";
import EditScheduleBtn from "../components/EditScheduleBtn";

function ExcursionSchedulesPage() {
  const [excursionSchedules, setExcursionScgedules] = useState<ExcursionSchedule[]>([]);

  const initSchedules = () => {
    getSchedules().then((data) => setExcursionScgedules(data));
  };

  useEffect(() => {
    initSchedules();
  }, []);

  return (
    <>
      <SchedulesTable
        schedules={excursionSchedules}
        actionSlot={(s) => (
          <div className="text-end">
            <EditScheduleBtn scheduleId={s.scheduleId} onChange={initSchedules} />{" "}
            <DeleteScheduleBtn scheduleId={s.scheduleId} onDeleted={initSchedules} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Excursions schedule</h3>
          <EditScheduleBtn onChange={initSchedules} />
        </div>
      </SchedulesTable>
    </>
  );
}

export default ExcursionSchedulesPage;
