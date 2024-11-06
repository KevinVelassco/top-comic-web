import { comicApi } from '@/api/comicApi';
import type { User } from '@/modules/auth/interfaces';
import { getMessageFromError } from '@/modules/common/helpers';

export interface CreateUserInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export const createUserAction = async (createUserInput: CreateUserInput): Promise<User> => {
  try {
    const { data } = await comicApi.post<User>('/user', createUserInput);
    return data;
  } catch (error) {
    throw getMessageFromError(error);
  }
};
