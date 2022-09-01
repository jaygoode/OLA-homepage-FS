export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  goingToEvent: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserReducerState {
  userList: User[];
  currentUser: User | undefined;
}
