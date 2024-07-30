import { useEffect, useState } from "react";
import { Visa } from "../models";
import { getVisas } from "../services/visa-service";
import VisasTable from "../containers/VisasTable";
import DeleteVisaBtn from "../components/DeleteVisaBtn";
import EditVisaBtn from "../components/EditVisaBtn";

function VisasPage() {
  const [visas, setVisas] = useState<Visa[]>([]);

  const initVisas = () => {
    getVisas().then((data) => setVisas(data));
  };

  useEffect(() => {
    initVisas();
  }, []);

  return (
    <>
      <VisasTable
        visas={visas}
        actionSlot={(v) => (
          <div className="text-end">
            <EditVisaBtn visaId={v.visaId} onChange={initVisas} />{" "}
            <DeleteVisaBtn visaId={v.visaId} onDeleted={initVisas} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Visas</h3>
          <EditVisaBtn onChange={initVisas} />
        </div>
      </VisasTable>
    </>
  );
}

export default VisasPage;
