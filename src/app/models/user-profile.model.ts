export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
  level?: number;
  isDisplay?: boolean;
}

export interface Games {
  date: string;
  playersNumber: number;
  time?: string;
  players?: [];
  waiting?: [];
  teams?: [];
  isDisplay?: boolean;
  location?: string;
  populated?: string;
}

export interface Users {}

export interface FinalTeams {
  team1: any[];
  team2: any[];
  team3: any[];
  team4: any[];
  team5: any[];
}
