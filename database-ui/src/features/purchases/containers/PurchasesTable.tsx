import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Purchase } from "../models";
import ItemName from "../../warehouseItems/components/ItemName";

interface PurchasesTableProps {
  purchases: Purchase[];
  actionSlot?: (p: Purchase) => ReactNode;
  children?: ReactNode;
}

function PurchasesTable(props: PurchasesTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tourist Id</th>
            <th>Product Id</th>
            <th>Product name</th>
            <th>Count of purchase</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.purchases.map((p) => (
            <tr key={p.purchaseId}>
              <td>{p.purchaseId}</td>
              <td>{p.touristId}</td>
              <td>{p.productId}</td>
              <td><ItemName productId={p.productId}/></td>
              <td>{p.count}</td>
              {props.actionSlot && <td>{props.actionSlot(p)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default PurchasesTable;
