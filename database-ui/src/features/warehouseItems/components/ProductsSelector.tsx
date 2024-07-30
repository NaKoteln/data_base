import { Item } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getItems } from "../services/warehouseItemss-service";

interface ItemsSelectorProps {
  productId: number;
  onSelected: (productId: number) => void;
}

function ProductsSelector(props: ItemsSelectorProps) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.productId ?? "Выберите человека"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {items.map((item) => (
        <option key={item.productId} value={item.productId}>
          {item.name}
        </option>
      ))}
    </Input>
  );
}

export default ProductsSelector;
