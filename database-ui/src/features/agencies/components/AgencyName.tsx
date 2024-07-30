import { Agency } from "../models";
import { useEffect, useState } from "react";
import { getAgency } from "../services/agency-service";

interface AgencysSelectorProps {
  agencyId: number;
}

function AgencyName(props: AgencysSelectorProps) {
  const [agency, setAgency] = useState<Agency>();

  useEffect(() => {
    getAgency(props.agencyId).then((data) => setAgency(data));
  }, []);

  return (
    <>{agency?.name ?? "Loading"}</>
  );
}

export default AgencyName;
