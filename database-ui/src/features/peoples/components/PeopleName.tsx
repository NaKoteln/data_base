import { People } from "../models";
import { useEffect, useState } from "react";
import { getPeople } from "../services/people-service";

interface CountriesSelectorProps {
  peopleId: number;
}

function PeopleName(props: CountriesSelectorProps) {
  const [people, setPeople] = useState<People>();

  useEffect(() => {
    getPeople(props.peopleId).then((data) => setPeople(data));
  }, []);

  return (
    <>{(`${people?.firstName}  ${people?.lastName}`) ?? "Loading"}</>
  );
}

export default PeopleName;
