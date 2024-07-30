import { useEffect, useState } from "react";
import { People } from "../models";
import { getPeoples } from "../services/people-service";
import PeoplesTable from "../containers/PeoplesTable";
import DeletePeopleBtn from "../components/DeletePeopleBtn";
import EditPeopleBtn from "../components/EditPeopleBtn";

function PeoplesPage() {
  const [peoples, setPeoples] = useState<People[]>([]);

  const initPeoples = () => {
    getPeoples().then((data) => setPeoples(data));
  };

  useEffect(() => {
    initPeoples();
  }, []);

  return (
    <>
      <PeoplesTable
        peoples={peoples}
        actionSlot={(p) => (
          <div className="text-end">
            <EditPeopleBtn peopleId={p.peopleId} onChange={initPeoples} />{" "}
            <DeletePeopleBtn peopleId={p.peopleId} onDeleted={initPeoples} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Peoples</h3>
          <EditPeopleBtn onChange={initPeoples} />
        </div>
      </PeoplesTable>
    </>
  );
}

export default PeoplesPage;
