import { useEffect, useState } from "react";
import { Service } from "../models";
import { getActualServices } from "../services/service-service";
import ServicesTable from "../containers/ServicesTable";
import DeleteServiceBtn from "../components/DeleteServiceBtn";
import CreateServiceBtn from "../components/CreateServiceBtn";

function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  const initServices = () => {
    getActualServices().then((data) => setServices(data));
  };

  useEffect(() => {
    initServices();
  }, []);

  return (
    <>
      <ServicesTable
        services={services}
        actionSlot={(s) => (
          <div className="text-end">
            <DeleteServiceBtn serviceId={s.serviceId} onDeleted={initServices} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Services</h3>
          <CreateServiceBtn onCreated={initServices} />
        </div>
      </ServicesTable>
    </>
  );
}

export default ServicesPage;
