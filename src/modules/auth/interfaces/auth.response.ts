import type { User } from './user.interface';

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}
