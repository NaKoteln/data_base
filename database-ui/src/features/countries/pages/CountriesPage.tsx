import { useEffect, useState } from "react";
import { Country } from "../models";
import { getCountries } from "../services/country-service";
import CountriesTable from "../containers/CountriesTable";
import DeleteCountryBtn from "../components/DeleteCountryBtn";
import EditCountryBtn from "../components/EditCountryBtn";

function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);

  const initCountries = () => {
    getCountries().then((data) => setCountries(data));
  };

  useEffect(() => {
    initCountries();
  }, []);

  return (
    <>
      <CountriesTable
        countries={countries}
        actionSlot={(c) => (
          <div className="text-end">
            <EditCountryBtn countryId={c.countryId} onChange={initCountries} />{" "}
            <DeleteCountryBtn countryId={c.countryId} onDeleted={initCountries} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Countries</h3>
          <EditCountryBtn onChange={initCountries} />
        </div>
      </CountriesTable>
    </>
  );
}

export default CountriesPage;
