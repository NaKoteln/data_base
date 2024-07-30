import { Hotel } from "../../../../features/hotels/models";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { getHotels } from "../../../../features/hotels/services/hotels-service";

interface HotelNameSelectorProps {
  hotelName: string;
  onSelected: (hotelName: string) => void;
}

function HotelNameSelector(props: HotelNameSelectorProps) {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    getHotels().then((data) => setHotels(data));
  }, []);

  return (
    <Input
      type="select"
      value={props?.hotelName ?? "Выберите отель"}
      onChange={(e) => props.onSelected(e.currentTarget.value)}
    >
      <option value={undefined}>Не выбрано</option>
      {hotels.map((hotel) => (
        <option key={hotel.hotelId} value={hotel.name}>
          {hotel.name}
        </option>
      ))}
    </Input>
  );
}

export default HotelNameSelector;
