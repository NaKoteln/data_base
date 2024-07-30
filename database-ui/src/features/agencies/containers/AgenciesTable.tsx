import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Agency } from "../models";

interface AgenciesTableProps {
  agencies: Agency[];
  actionSlot?: (a: Agency) => ReactNode;
  children?: ReactNode;
}

function AgenciesTable(props: AgenciesTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.agencies.map((a) => (
            <tr key={a.agencyId}>
              <td>{a.agencyId}</td>
              <td>{a.name}</td>
              {props.actionSlot && <td>{props.actionSlot(a)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default AgenciesTable;
