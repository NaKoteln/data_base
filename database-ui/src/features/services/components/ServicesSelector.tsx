import { Service } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getActualServices } from "../services/service-service";

interface ServicesSelectorProps {
  serviceId: number;
  onSelected: (ServiceId: number) => void;
}

function ServicesSelector(props: ServicesSelectorProps) {
  const [Services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getActualServices().then((data) => setServices(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.serviceId ?? "Выберите человека"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {Services.map((service) => (
        <option key={service.serviceId} value={service.serviceId}>
          {service.name}
        </option>
      ))}
    </Input>
  );
}

export default ServicesSelector;
