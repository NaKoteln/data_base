import { Item } from "../models";
import { useEffect, useState } from "react";
import { getItem } from "../services/warehouseItemss-service";

interface ItemsSelectorProps {
  productId: number;
}

function ItemName(props: ItemsSelectorProps) {
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    getItem(props.productId).then((data) => setItem(data));
  }, []);

  return (
    <>{item?.name ?? "Loading"}</>
  );
}

export default ItemName;
