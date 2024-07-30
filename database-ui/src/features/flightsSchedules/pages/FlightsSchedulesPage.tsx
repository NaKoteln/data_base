import { useEffect, useState } from "react";
import { FlightSchedule } from "../models";
import { getSchedules } from "../services/schedule-service";
import SchedulesTable from "../containers/SchedulesTable";
import DeleteScheduleBtn from "../components/DeleteScheduleBtn";
import EditScheduleBtn from "../components/EditScheduleBtn";

function FlightSchedulesPage() {
  const [FlightSchedules, setFlightScgedules] = useState<FlightSchedule[]>([]);

  const initSchedules = () => {
    getSchedules().then((data) => setFlightScgedules(data));
  };

  useEffect(() => {
    initSchedules();
  }, []);

  return (
    <>
      <SchedulesTable
        schedules={FlightSchedules}
        actionSlot={(f) => (
          <div className="text-end">
            <EditScheduleBtn scheduleId={f.scheduleId} onChange={initSchedules} />{" "}
            <DeleteScheduleBtn scheduleId={f.scheduleId} onDeleted={initSchedules} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Flights schedule</h3>
          <EditScheduleBtn onChange={initSchedules} />
        </div>
      </SchedulesTable>
    </>
  );
}

export default FlightSchedulesPage;
