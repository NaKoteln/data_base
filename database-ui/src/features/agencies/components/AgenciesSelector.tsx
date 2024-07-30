import { Agency } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getAgencies } from "../services/agency-service";

interface AgenciesSelectorProps {
  agencyId: number;
  onSelected: (agencyId: number) => void;
}

function AgenciesSelector(props: AgenciesSelectorProps) {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    getAgencies().then((data) => setAgencies(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.agencyId ?? "Выберите агентство"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {agencies.map((agency) => (
        <option key={agency.agencyId} value={agency.agencyId}>
          {agency.name}
        </option>
      ))}
    </Input>
  );
}

export default AgenciesSelector;
