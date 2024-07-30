import { useEffect, useState } from "react";
import { Excursion } from "../models";
import { getExcursions } from "../services/excursion-service";
import ExcursionsTable from "../containers/ExcursionsTable";
import CreateExcursionBtn from "../components/CreateExcursionBtn";
import DeleteExcursionBtn from "../components/DeleteExcursionBtn";
import UpdateExcursionBtn from "../components/UpdateExcursionBtn";

function ExcursionsPage() {
  const [excursions, setExcursions] = useState<Excursion[]>([]);

  const initExcursions = () => {
    getExcursions().then((data) => setExcursions(data));
  };

  useEffect(() => {
    initExcursions();
  }, []);

  return (
    <>
      <ExcursionsTable
        excursions={excursions}
        actionSlot={(e) => (
          <div className="text-end">
            <UpdateExcursionBtn excursionId={e.excursionId} onUpdated={initExcursions} />{" "}
            <DeleteExcursionBtn excursionId={e.excursionId} onDeleted={initExcursions} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Excursions</h3>
          <CreateExcursionBtn onCreated={initExcursions} />
        </div>
      </ExcursionsTable >
    </>
  );
}

export default ExcursionsPage;
