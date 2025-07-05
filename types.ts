
export enum MainTab {
  Front = 'Front',
  Road = 'Road',
  Disposal = 'Disposal',
}

export enum SubTab {
  Lapor = 'Lapor',
  Activity = 'Activity',
}

export interface User {
  name: string;
  nrp: string;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  timestamp: number;
}

export interface Report {
  id: string;
  timestamp: number;
  author: User;
  reportText: string;
  evidence: string; // base64 string of the image
  category: MainTab;
  comments: Comment[];
}
