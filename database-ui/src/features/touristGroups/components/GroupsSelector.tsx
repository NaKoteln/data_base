import { Group } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getGroups } from "../services/group-service";

interface GroupsSelectorProps {
  groupId: number;
  onSelected: (peopleId: number) => void;
}

function GroupsSelector(props: GroupsSelectorProps) {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    getGroups().then((data) => setGroups(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.groupId ?? "Выберите группу"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {groups.map((group) => (
        <option key={group.groupId} value={group.groupId}>
          {group.name}
        </option>
      ))}
    </Input>
  );
}

export default GroupsSelector;
