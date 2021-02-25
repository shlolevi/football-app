export interface UserProfile {
    uid: string;
    name: string;
    email: string;
    password?: string;
    role?: string;
    level?: number;
    isDisplay?: boolean;
}

export  interface Games {
    date: string;
    playersNumber: number;
    time?:string;
    players?:[];
    waiting?:[];
    teams?:[];
    isDisplay?: boolean;
  }

  export  interface Users {}