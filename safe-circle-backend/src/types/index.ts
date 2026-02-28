export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Alert {
  id: string;
  userId: string;
  location: Location;
  timestamp: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
}