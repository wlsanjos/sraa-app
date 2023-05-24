interface Team {
  id: string;
  name?: string;
  initial_date?: string;
  end_date?: string;
  deleted?: boolean;

  schedules_id?: string[];
  schedules?: Schedule[];

  students_id?: string[];
  students?: Student[];

  trainers_id?: string[];
  trainers?: Trainer[];

  status?: TeamStatus;
  status_id?: string;

  guild_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface Trainer {
  id: string;
  surname?: string;
  name: string;
  passport: string;
  member_id?: string;
  avatar_url?: string;
  role_id: string;
  deleted: boolean;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Student {
  id: string;
  user_id: string;
  experience?: string;
  attendance: Array<String>;
  observation?: string  
  deleted : boolean;
  createdAt?: Date;
  updatedAt?: Date;
  //team_id: Array<String>;
}

interface TeamStatus {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

interface Schedule {
  id: number;
  dayOfWeek: string;
  time: string;
}

export { Team, Trainer, Student, TeamStatus, Schedule };