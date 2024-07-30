import { Visa } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getVisas } from "../services/visa-service";

interface VisasSelectorProps {
  visaId: number;
  onSelected: (VisaId: number) => void;
}

function VisasSelector(props: VisasSelectorProps) {
  const [visas, setVisas] = useState<Visa[]>([]);

  useEffect(() => {
    getVisas().then((data) => setVisas(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.visaId ?? "Выберите человека"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {visas.map((visa) => (
        <option key={visa.visaId} value={visa.visaId}>
          {visa.visaId} for {visa.country}
        </option>
      ))}
    </Input>
  );
}

export default VisasSelector;
