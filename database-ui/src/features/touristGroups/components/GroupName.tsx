import { Group } from "../models";
import { useEffect, useState } from "react";
import { getGroup } from "../services/group-service";

interface CountriesSelectorProps {
  groupId: number;
}

function GroupName(props: CountriesSelectorProps) {
  const [group, setGroup] = useState<Group>();

  useEffect(() => {
    getGroup(props.groupId).then((data) => setGroup(data));
  }, []);

  return (
    <>{group?.name ?? "Loading"}</>
  );
}

export default GroupName;
