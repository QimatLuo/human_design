export interface Meta {
  type: string;
  name: string;
  tags: any[];
  created: string;
  updated: string;
  dirty: boolean;
  birthData: BirthData;
}

export interface BirthData {
  location: Location;
  time: Time;
  reliability: Reliability;
}

export interface Location {
  country: Country;
  city: City;
}

export interface Country {
  id: string;
  name: string;
  tz: string;
}

export interface City {
  name: string;
  timezone: string;
  tz: string;
}

export interface Time {
  local: string;
  utc: string;
  status: string;
  timezone: Timezone;
  dst: any;
}

export interface Timezone {
  id: string;
  name: string;
  offset: number;
}

export interface Reliability {
  score: number;
  context: string;
  changes: Changes;
}

export interface Changes {
  authority: number;
  cross: number;
  definition: number;
  profile: number;
  type: number;
  variable: number;
  channels: number;
  centers: number;
}
