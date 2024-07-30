import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Tourist } from "../models";
import PeopleName from "../../peoples/components/PeopleName";
import GroupName from "../../touristGroups/components/GroupName";

interface TouristsTableProps {
  tourists: Tourist[];
  actionSlot?: (p: Tourist) => ReactNode;
  children?: ReactNode;
}

function TouristsTable(props: TouristsTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>People Id</th>
            <th>Name</th>
            <th>Group Id</th>
            <th>Group Name</th>
            <th>Category</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.tourists.map((t) => (
            <tr key={t.touristId}>
              <td>{t.touristId}</td>
              <td>{t.peopleId}</td>
              <td><PeopleName peopleId={t.peopleId}/></td>
              <td>{t.groupId}</td>
              <td><GroupName groupId={t.groupId}/></td>
              <td>{t.category[0].toUpperCase() + t.category.slice(1)}</td>
              {props.actionSlot && <td>{props.actionSlot(t)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TouristsTable;
