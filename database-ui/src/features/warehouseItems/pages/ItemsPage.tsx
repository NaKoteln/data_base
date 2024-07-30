import { useEffect, useState } from "react";

import { Item } from "../models";
import { getItems } from "../services/warehouseItemss-service";
import ItemsTable from "../containers/ItemsTable";
import DeleteItemBtn from "../components/DeleteItemBtn";
import EditItemBtn from "../components/EditItemBtn";

function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  const initItems = () => {
    getItems().then((data) => setItems(data));
  };

  useEffect(() => {
    initItems();
  }, []);

  return (
    <>
      <ItemsTable
        items={items}
        actionSlot={(i) => (
          <div className="text-end">
            <EditItemBtn productId={i.productId} onChange={initItems} />{" "}
            <DeleteItemBtn productId={i.productId} onDeleted={initItems} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Items in warehouse</h3>
          <EditItemBtn onChange={initItems} />
        </div>
      </ItemsTable >
    </>
  );
}

export default ItemsPage;
