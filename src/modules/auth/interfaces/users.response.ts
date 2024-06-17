import type { User } from './user.interface';

export interface UsersResponse {
  meta: Meta;
  results: User[];
}

export interface Meta {
  count: number;
  page: number;
  lastPage: number;
  perPage: number;
}
