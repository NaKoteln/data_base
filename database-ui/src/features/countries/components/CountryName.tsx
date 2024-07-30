import { Country } from "../models";
import { useEffect, useState } from "react";
import { getCountry } from "../services/country-service";

interface CountriesSelectorProps {
  countryId: number;
}

function CountryName(props: CountriesSelectorProps) {
  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    getCountry(props.countryId).then((data) => setCountry(data));
  }, []);

  return (
    <>{country?.name ?? "Loading"}</>
  );
}

export default CountryName;
