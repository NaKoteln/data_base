import { Service } from "../models";
import { useEffect, useState } from "react";
import { getService } from "../services/service-service";

interface CountriesSelectorProps {
  serviceId: number;
}

function ServiceName(props: CountriesSelectorProps) {
  const [service, setService] = useState<Service>();

  useEffect(() => {
    getService(props.serviceId).then((data) => setService(data));
  }, []);

  return (
    <>{service?.name ?? "Loading"}</>
  );
}

export default ServiceName;
