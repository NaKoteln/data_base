import { Country } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getCountries } from "../services/country-service";

interface CountriesSelectorProps {
  countryId: number;
  onSelected: (countryId: number) => void;
}

function CountriesSelector(props: CountriesSelectorProps) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then((data) => setCountries(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.countryId ?? "Выберите агентство"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {countries.map((country) => (
        <option key={country.countryId} value={country.countryId}>
          {country.name}
        </option>
      ))}
    </Input>
  );
}

export default CountriesSelector;
