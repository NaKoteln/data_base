import { Flight } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getFlights } from "../services/flight-service";

interface FlightsSelectorProps {
  flightId: number;
  onSelected: (FlightId: number) => void;
}

function FlightsSelector(props: FlightsSelectorProps) {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    getFlights().then((data) => setFlights(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.flightId ?? "Выберите агентство"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {flights.map((flight) => (
        <option key={flight.flightId} value={flight.flightId}>
          {flight.flightId}
        </option>
      ))}
    </Input>
  );
}

export default FlightsSelector;
