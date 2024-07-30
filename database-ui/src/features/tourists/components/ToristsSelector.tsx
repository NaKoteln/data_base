import { Tourist } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getTourists } from "../services/tourist-service";
import { People } from "../../peoples/models";
import { getPeople } from "../../peoples/services/people-service";
import PeopleName from "../../peoples/components/PeopleName";

interface TouristsSelectorProps {
  touristId: number;
  onSelected: (touristId: number) => void;
}

function TouristsSelector(props: TouristsSelectorProps) {
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [peoples, setPeoples] = useState<People[]>([]);

  useEffect(() => {
    getTourists().then((data) => setTourists(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.touristId ?? "Выберите человека"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {tourists.map((tourist, i) => (
        <option key={tourist.touristId} value={tourist.touristId}>
          {tourist.touristId}. <PeopleName peopleId={tourist.peopleId} />
        </option>
      ))}
    </Input>
  );
}

export default TouristsSelector;
