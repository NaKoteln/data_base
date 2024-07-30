import { ReactNode } from "react";
import { Table } from "reactstrap";

import { ExcursionSchedule } from "../models";
import ExcursionName from "../../excursions/components/ExcursionName";

interface SchedulesTableProps {
  schedules: ExcursionSchedule[];
  actionSlot?: (a: ExcursionSchedule) => ReactNode;
  children?: ReactNode;
}

function SchedulesTable(props: SchedulesTableProps) {

  // преобразование объекта Date в строку формата 'YYYY-MM-DD'
  const formatDate = (date: Date) => {
    // toISOString: эта строка имеет вид YYYY-MM-DDTHH:mm:ss.sssZ
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Excursion Id</th>
            <th>Name</th>
            <th>Date</th>
            <th>Start time</th>
            <th>End time</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.schedules.map((s) => (
            <tr key={s.scheduleId}>
              <td>{s.scheduleId}</td>
              <td>{s.excursionId}</td>
              <td><ExcursionName excursionId={s.excursionId}/></td>
              <td>{formatDate(new Date(s.excursionDate))}</td>
              <td>{s.startTime}</td>
              <td>{s.endTime}</td>
              {props.actionSlot && <td>{props.actionSlot(s)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default SchedulesTable;
