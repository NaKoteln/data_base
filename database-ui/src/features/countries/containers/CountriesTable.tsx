import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Country } from "../models";

interface CountriesTableProps {
  countries: Country[];
  actionSlot?: (a: Country) => ReactNode;
  children?: ReactNode;
}

function CountriesTable(props: CountriesTableProps) {
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
          {props.countries.map((c) => (
            <tr key={c.countryId}>
              <td>{c.countryId}</td>
              <td>{c.name}</td>
              {props.actionSlot && <td>{props.actionSlot(c)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default CountriesTable;
