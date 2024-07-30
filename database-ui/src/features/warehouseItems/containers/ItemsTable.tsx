import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Item } from "../models";

interface ItemsTableProps {
  items: Item[];
  actionSlot?: (i: Item) => ReactNode;
  children?: ReactNode;
}

function ItemsTable(props: ItemsTableProps) {
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Place Number</th>
            <th>Weight</th>
            <th>Cost</th>
            <th>Insurance cost</th>
            <th>Packaging cost</th>
            <th>Receipt date</th>
            <th>Unloading date</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.items.map((i) => (
            <tr key={i.productId}>
              <td>{i.productId}</td>
              <td>{i.name}</td>
              <td>{i.placeNumber}</td>
              <td>{i.weight}</td>
              <td>{i.cost}</td>
              <td>{i.insuranceCost}</td>
              <td>{i.packagingCost}</td>
              <td>{formatDate(new Date(i.receiptDate))}</td>
              <td>{formatDate(new Date(i.unloadingDate))}</td>
              {props.actionSlot && <td>{props.actionSlot(i)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ItemsTable;
