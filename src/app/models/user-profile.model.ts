export interface UserProfile {
    uid: string;
    name: string;
    email: string;
    password?: string;
}

export  interface Games {
    date: string;
    playersNumber: number;
    time?:string;
    players?:[];
    waiting?:[];
    teams?:[];
  }

  export  interface Users {}