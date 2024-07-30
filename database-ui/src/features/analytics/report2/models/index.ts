export interface Report {
  checkInDate: Date;
  checkOutDate: Date;
  Hotel: Hotel;
  Tourist: Tourist;
}

interface Hotel {
  name: string;
}

interface Tourist {
  touristId: number;
  groupId: number;
  People: People;
}

interface People {
  lastName: string;
  firstName: string;
}