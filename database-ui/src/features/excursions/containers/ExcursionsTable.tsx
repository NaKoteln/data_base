import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Excursion } from "../models";
import AgencyName from "../../agencies/components/AgencyName";

interface ExcursionsTableProps {
  excursions: Excursion[];
  actionSlot?: (e: Excursion) => ReactNode;
  children?: ReactNode;
}

function FlightsTable(props: ExcursionsTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Agency Id</th>
            <th>Agency name</th>
            <th>Cost</th>
            <th>Maximum people</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.excursions.map((e) => (
            <tr key={e.excursionId}>
              <td>{e.excursionId}</td>
              <td>{e.name}</td>
              <td>{e.agencyId}</td>
              <td><AgencyName agencyId={e.agencyId}/></td>
              <td>{e.cost}</td>
              <td>{e.maximumPeople}</td>
              {props.actionSlot && <td>{props.actionSlot(e)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default FlightsTable;
