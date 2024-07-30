import { Excursion } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getExcursions } from "../services/excursion-service";

interface ExcursionsSelectorProps {
  excursionId: number;
  onSelected: (excursionId: number) => void;
}

function ExcursionsSelector(props: ExcursionsSelectorProps) {
  const [excursions, setExcursions] = useState<Excursion[]>([]);

  useEffect(() => {
    getExcursions().then((data) => setExcursions(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.excursionId ?? "Выберите агентство"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {excursions.map((excursion) => (
        <option key={excursion.excursionId} value={excursion.excursionId}>
          {excursion.name}
        </option>
      ))}
    </Input>
  );
}

export default ExcursionsSelector;
