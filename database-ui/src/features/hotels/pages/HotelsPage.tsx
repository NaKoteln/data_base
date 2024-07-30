import { useEffect, useState } from "react";

import { Hotel } from "../models";
import { getHotels } from "../services/hotels-service";
import HotelsTable from "../containers/HotelsTable";
import DeleteHotelBtn from "../components/DeleteHotelBtn";
import CreateHotelBtn from "../components/CreateHotelBtn";
import UpdateHotelBtn from "../components/UpdateHotelBtn";

function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const initHotels = () => {
    getHotels().then((data) => setHotels(data));
  };

  useEffect(() => {
    initHotels();
  }, []);

  return (
    <>
      <HotelsTable
        hotels={hotels}
        actionSlot={(h) => (
          <div className="text-end">
            <DeleteHotelBtn hotelId={h.hotelId} onDeleted={initHotels} />{" "}
            <UpdateHotelBtn hotelId={h.hotelId} onUpdated={initHotels} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Hotels</h3>
          <CreateHotelBtn onCreated={initHotels} />
        </div>
      </HotelsTable >
    </>
  );
}

export default HotelsPage;
