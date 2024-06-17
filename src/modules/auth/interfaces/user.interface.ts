export interface User {
  id: string;
  authUid: string;
  name: string;
  lastName: string;
  email: string;
  phone: null;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
