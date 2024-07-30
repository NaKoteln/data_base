export interface Report {
  excursions: Excursion[];
  agencies: Agency[];
}

interface Excursion {
  excursionId: number;
  name: string;
  count_bookings: number;
}

interface Agency {
  agencyId: number;
  name: string;
  average_estimation: number;
}
