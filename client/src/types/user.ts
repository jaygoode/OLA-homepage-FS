export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "customer" | "admin";
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserReducerState {
  userList: User[];
  currentUser: User | undefined;
}
