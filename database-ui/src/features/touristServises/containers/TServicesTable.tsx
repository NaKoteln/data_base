import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Service } from "../models";
import ServiceName from "../../services/components/ServiceName";

interface TServicesTableProps {
  services: Service[];
  actionSlot?: (p: Service) => ReactNode;
  children?: ReactNode;
}

function TServicesTable(props: TServicesTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tourist Id</th>
            <th>Service record</th>
            <th>Service name</th>
            <th>Service date</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.services.map((v) => (
            <tr key={v.recordId}>
              <td>{v.recordId}</td>
              <td>{v.touristId}</td>
              <td>{v.serviceId}</td>
              <td><ServiceName serviceId={v.serviceId}/></td>
              <td>{new Date(v.date).toISOString().split('T')[0]}</td>
              {props.actionSlot && <td>{props.actionSlot(v)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TServicesTable;
