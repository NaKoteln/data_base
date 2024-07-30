import { useEffect, useState } from "react";
import { Agency } from "../models";
import { getAgencies } from "../services/agency-service";
import AgenciesTable from "../containers/AgenciesTable";
import DeleteAgencyBtn from "../components/DeleteAgencyBtn";
import EditAgencyBtn from "../components/EditAgencyBtn";

function AgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  const initAgencies = () => {
    getAgencies().then((data) => setAgencies(data));
  };

  useEffect(() => {
    initAgencies();
  }, []);

  return (
    <>
      <AgenciesTable
        agencies={agencies}
        actionSlot={(a) => (
          <div className="text-end">
            <EditAgencyBtn agencyId={a.agencyId} onChange={initAgencies} />{" "}
            <DeleteAgencyBtn agencyId={a.agencyId} onDeleted={initAgencies} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Agencies</h3>
          <EditAgencyBtn onChange={initAgencies} />
        </div>
      </AgenciesTable>
    </>
  );
}

export default AgenciesPage;
