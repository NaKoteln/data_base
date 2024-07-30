export interface Report {
  groupId: number;
  totalhotelcost: Cost;
  totalexcursioncost: number;
  totaltourists: number;
}

interface Cost {
  days: number;
}
