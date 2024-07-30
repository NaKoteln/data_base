import { useEffect, useState } from "react";
import { Tourist } from "../models";
import { getTourists } from "../services/tourist-service";
import TouristsTable from "../containers/TouristsTable";
import DeleteTouristBtn from "../components/DeleteTouristBtn";
import EditTouristBtn from "../components/EditTouristBtn";

function TouristsPage() {
  const [tourists, setTourists] = useState<Tourist[]>([]);

  const initTourists = () => {
    getTourists().then((data) => setTourists(data));
  };

  useEffect(() => {
    initTourists();
  }, []);

  return (
    <>
      <TouristsTable
        tourists={tourists}
        actionSlot={(t) => (
          <div className="text-end">
            <EditTouristBtn touristId={t.touristId} onChange={initTourists} />{" "}
            <DeleteTouristBtn touristId={t.touristId} onDeleted={initTourists} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Tourists</h3>
          <EditTouristBtn onChange={initTourists} />
        </div>
      </TouristsTable>
    </>
  );
}

export default TouristsPage;
