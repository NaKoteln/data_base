import { ReactNode } from "react";
import { Table } from "reactstrap";

import { FlightSchedule } from "../models";

interface SchedulesTableProps {
  schedules: FlightSchedule[];
  actionSlot?: (a: FlightSchedule) => ReactNode;
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
            <th>Tourist Id</th>
            <th>Flight number</th>
            <th>Date</th>
            <th>Flight type</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.schedules.map((s) => (
            <tr key={s.scheduleId}>
              <td>{s.scheduleId}</td>
              <td>{s.touristId}</td>
              <td>{s.flightNumber}</td>
              <td>{formatDate(new Date(s.date))}</td>
              <td>{s.flightType[0].toUpperCase() + s.flightType.slice(1)}</td>
              {props.actionSlot && <td>{props.actionSlot(s)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default SchedulesTable;
