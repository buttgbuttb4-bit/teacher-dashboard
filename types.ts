export type Session = 'Morning' | 'Evening';

export type Status = 'Pending' | 'Accepted' | 'Rejected';

export interface Student {
  name: string;
  avatar?: string;
}

export interface ProjectIdea {
  id: string;
  title: string;
  leader: Student;
  team: Student[];
  session: Session;
  shortDescription: string;
  fullDescription: string;
  status: Status;
  progress: number; // 0 to 100
  milestones: {
    current: string;
    next: string;
  };
}
