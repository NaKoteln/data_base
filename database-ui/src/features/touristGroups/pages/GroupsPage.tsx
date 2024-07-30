import { useEffect, useState } from "react";
import { Group } from "../models";
import { getGroups } from "../services/group-service";
import GroupsTable from "../containers/GroupsTable";
import DeleteGroupBtn from "../components/DeleteGroupBtn";
import EditGroupBtn from "../components/EditGroupBtn";

function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);

  const initGroups = () => {
    getGroups().then((data) => setGroups(data));
  };

  useEffect(() => {
    initGroups();
  }, []);

  return (
    <>
      <GroupsTable
        groups={groups}
        actionSlot={(g) => (
          <div className="text-end">
            <EditGroupBtn groupId={g.groupId} onChange={initGroups} />{" "}
            <DeleteGroupBtn groupId={g.groupId} onDeleted={initGroups} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Groups</h3>
          <EditGroupBtn onChange={initGroups} />
        </div>
      </GroupsTable>
    </>
  );
}

export default GroupsPage;
