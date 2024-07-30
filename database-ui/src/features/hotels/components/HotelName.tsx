import { Hotel } from "../models";
import { useEffect, useState } from "react";
import { getHotel } from "../services/hotels-service";

interface HotelsSelectorProps {
  hotelId: number;
}

function HotelName(props: HotelsSelectorProps) {
  const [hotel, setHotel] = useState<Hotel>();

  useEffect(() => {
    getHotel(props.hotelId).then((data) => setHotel(data));
  }, []);

  return (
    <>{hotel?.name ?? "Loading"}</>
  );
}

export default HotelName;
