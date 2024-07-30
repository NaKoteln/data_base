import { useEffect, useState } from "react";
import { Flight } from "../models";
import { getFlights } from "../services/flight-service";
import FlightsTable from "../containers/FlightsTable";
import CreateFlightBtn from "../components/CreateFlightBtn";
import DeleteFlightBtn from "../components/DeleteFlightBtn";
import UpdateFlightBtn from "../components/UpdateFlightBtn";

function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);

  const initFlights = () => {
    getFlights().then((data) => setFlights(data));
  };

  useEffect(() => {
    initFlights();
  }, []);

  return (
    <>
      <FlightsTable
        flights={flights}
        actionSlot={(f) => (
          <div className="text-end">
            <DeleteFlightBtn flightId={f.flightId} onDeleted={initFlights} />{" "}
            <UpdateFlightBtn flightId={f.flightId} onUpdated={initFlights} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Flights</h3>
          <CreateFlightBtn onCreated={initFlights} />
        </div>
      </FlightsTable >
    </>
  );
}

export default FlightsPage;
