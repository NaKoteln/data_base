import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Group } from "../models";
import CountryName from "../../countries/components/CountryName";

interface GroupsTableProps {
  groups: Group[];
  actionSlot?: (p: Group) => ReactNode;
  children?: ReactNode;
}

function GroupsTable(props: GroupsTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Country</th>
            <th>check in date</th>
            <th>Check out date</th>
          </tr>
        </thead>
        <tbody>
          {props.groups.map((g) => (
            <tr key={g.groupId}>
              <td>{g.groupId}</td>
              <td>{g.name}</td>
              <td><CountryName countryId={g.countryId}/></td>
              <td>{new Date(g.checkInDate).toISOString().split('T')[0]}</td>
              <td>{new Date(g.checkOutDate).toISOString().split('T')[0]}</td>
              {props.actionSlot && <td>{props.actionSlot(g)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default GroupsTable;
