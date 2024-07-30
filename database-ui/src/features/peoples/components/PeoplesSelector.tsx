import { People } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getPeoples } from "../services/people-service";

interface PeoplesSelectorProps {
  peopleId: number;
  onSelected: (peopleId: number) => void;
}

function PeoplesSelector(props: PeoplesSelectorProps) {
  const [peoples, setPeoples] = useState<People[]>([]);

  useEffect(() => {
    getPeoples().then((data) => setPeoples(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.peopleId ?? "Выберите человека"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {peoples.map((people) => (
        <option key={people.peopleId} value={people.peopleId}>
          {people.firstName + ' ' + people.lastName}
        </option>
      ))}
    </Input>
  );
}

export default PeoplesSelector;
