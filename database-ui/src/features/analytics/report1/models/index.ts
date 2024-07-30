export interface Report {
  touristId: number;
  category: string;
  People: People;
}

interface People {
  lastName: string;
  firstName: string;
  middleName: string;
  passportData: number;
  gender: boolean;
}