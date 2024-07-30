import { Excursion } from "../models";
import { useEffect, useState } from "react";
import { getExcursion } from "../services/excursion-service";

interface ExcursionsSelectorProps {
  excursionId: number;
}

function ExcursionName(props: ExcursionsSelectorProps) {
  const [excursion, setExcursion] = useState<Excursion>();

  useEffect(() => {
    getExcursion(props.excursionId).then((data) => setExcursion(data));
  }, []);

  return (
    <>{excursion?.name ?? "Loading"}</>
  );
}

export default ExcursionName;
