import { Hotel } from "../models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getHotels } from "../services/hotels-service";

interface HotelsSelectorProps {
  hotelId: number;
  onSelected: (hotelId: number) => void;
}

function HotelsSelector(props: HotelsSelectorProps) {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    getHotels().then((data) => setHotels(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.hotelId ?? "Выберите отель"}
      onChange={(e) => props.onSelected(+e.currentTarget.value)}
    >
      <option value={undefined}>
        Не выбрано
      </option>
      {hotels.map((hotel) => (
        <option key={hotel.hotelId} value={hotel.hotelId}>
          {hotel.name}
        </option>
      ))}
    </Input>
  );
}

export default HotelsSelector;
