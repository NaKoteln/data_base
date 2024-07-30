import { useEffect, useState } from "react";
import { Service } from "../models";
import { getServices } from "../services/tservice-service";
import TServicesTable from "../containers/TServicesTable";
import DeleteTServiceBtn from "../components/DeleteTServiceBtn";
import EditTServiceBtn from "../components/EditTServiceBtn";

function TServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  const initServices = () => {
    getServices().then((data) => setServices(data));
  };

  useEffect(() => {
    initServices();
  }, []);

  return (
    <>
      <TServicesTable
        services={services}
        actionSlot={(s) => (
          <div className="text-end">
            <EditTServiceBtn recordId={s.recordId} onChange={initServices} />{" "}
            <DeleteTServiceBtn recordId={s.recordId} onDeleted={initServices} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Services for tourists</h3>
          <EditTServiceBtn onChange={initServices} />
        </div>
      </TServicesTable>
    </>
  );
}

export default TServicesPage;
