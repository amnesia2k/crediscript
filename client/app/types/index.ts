// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   bio: string;
//   token: string;
// }

// export type AuthResponse = {
//   data: User;
//   success: boolean;
//   message: string;
// };

export interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthUser extends User {
  token: string;
}

export type AuthResponse = {
  success: true;
  message: string;
  data: {
    user: AuthUser;
  };
};

export type LogoutResponse = {
  success: true;
  message: string;
};

export type MeResponse = {
  success: true;
  message: string;
  data: {
    user: User;
  };
};

export type UsersResponse = {
  success: true;
  message: string;
  data: {
    users: User[];
  };
};
