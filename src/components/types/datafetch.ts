import { Timestamp } from "firebase/firestore";

export interface Basicdata {
  fullName: string;
  email: string;
  userName: string;
  initSetup: boolean;
}

export interface Filetype {
  name: string;
  lastModified: number;
  webkitRelativePath: string;
  size: number;
  type: string;
}

export interface Chats {
  ch: string;
  timestamp: Timestamp;
  username: string;
}
