export interface Report {
  flights: Flights[];
  hotels: Hotel[];
  excursions: Excursion[];
  purchases: Purchase[]
}

interface Flights {
  visits: number;
  firstArrival: Date;
  lastDeparture: Date;
}

interface Hotel {
  hotelName: string;
  checkInDate: Date;
  checkOutDate: Date;
}

interface Excursion {
  excursionName: string;
  agencyName: string;
}

interface Purchase {
  name: string,
  weight: number
}
