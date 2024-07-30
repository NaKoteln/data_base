import { ReactNode } from "react";
import { Table } from "reactstrap";

import { People } from "../models";

interface PeoplesTableProps {
  peoples: People[];
  actionSlot?: (p: People) => ReactNode;
  children?: ReactNode;
}

function PeoplesTable(props: PeoplesTableProps) {
  function setGender(data: boolean) {
    if (data) return "Man"
    return "Woman"
  }

  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Last name</th>
            <th>First name</th>
            <th>Middle name</th>
            <th>Passport data</th>
            <th>Gender</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.peoples.map((p) => (
            <tr key={p.peopleId}>
              <td>{p.peopleId}</td>
              <td>{p.lastName}</td>
              <td>{p.firstName}</td>
              <td>{p.middleName}</td>
              <td>{p.passportData}</td>
              <td>{setGender(p.gender)}</td>
              {props.actionSlot && <td>{props.actionSlot(p)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default PeoplesTable;
