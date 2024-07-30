import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Service } from "../models";

interface ServicesTableProps {
  services: Service[];
  actionSlot?: (p: Service) => ReactNode;
  children?: ReactNode;
}

function ServicesTable(props: ServicesTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Cost</th>
            <th></th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.services.map((p) => (
            <tr key={p.serviceId}>
              <td>{p.serviceId}</td>
              <td>{p.name}</td>
              <td>{p.cost}</td>
              {props.actionSlot && <td>{props.actionSlot(p)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ServicesTable;
