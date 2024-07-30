import { Country } from "../../../../features/countries/models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getCountries } from "../../../../features/countries/services/country-service";

interface CountriesSelectorProps {
  countryName: string;
  onSelected: (countryName: string) => void;
}

function CountriesSelector(props: CountriesSelectorProps) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then((data) => setCountries(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.countryName ?? "Выберите агентство"}
      onChange={(e) => props.onSelected(e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {countries.map((country) => (
        <option key={country.countryId} value={country.name}>
          {country.name}
        </option>
      ))}
    </Input>
  );
}

export default CountriesSelector;
