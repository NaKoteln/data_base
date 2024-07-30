import { ExcursionSchedule } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getSchedules } from "../services/schedule-service";

interface SchedulesSelectorProps {
  scheduleId: number;
  onSelected: (ScheduleId: number) => void;
}

function SchedulesSelector(props: SchedulesSelectorProps) {
  const [schedules, setSchedules] = useState<ExcursionSchedule[]>([]);

  useEffect(() => {
    getSchedules().then((data) => setSchedules(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.scheduleId ?? "Выберите человека"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {schedules.map((schedule) => (
        <option key={schedule.scheduleId} value={schedule.scheduleId}>
          {schedule.scheduleId}
        </option>
      ))}
    </Input>
  );
}

export default SchedulesSelector;
