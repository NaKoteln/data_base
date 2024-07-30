import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Visa } from "../models";
import CountryName from "../../countries/components/CountryName";

interface VisasTableProps {
  visas: Visa[];
  actionSlot?: (p: Visa) => ReactNode;
  children?: ReactNode;
}

function VisasTable(props: VisasTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tourist Id</th>
            <th>Country Id</th>
            <th>Country name</th>
            <th>Issue date</th>
            <th>Expiration date</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.visas.map((v) => (
            <tr key={v.visaId}>
              <td>{v.visaId}</td>
              <td>{v.touristId}</td>
              <td>{v.country}</td>
              <td><CountryName countryId={v.country}/></td>
              <td>{new Date(v.issueDate).toISOString().split('T')[0]}</td>
              <td>{new Date(v.expirationDate).toISOString().split('T')[0]}</td>
              {props.actionSlot && <td>{props.actionSlot(v)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default VisasTable;
