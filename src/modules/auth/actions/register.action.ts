import { comicApi } from '@/api/comicApi';
import type { AuthResponse } from '../interfaces';
import { getMessageFromError } from '@/modules/common/helpers';

export interface RegisterUserInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerAction = async (
  registerUserInput: RegisterUserInput,
): Promise<AuthResponse> => {
  try {
    const { data } = await comicApi.post<AuthResponse>('/auth/register', registerUserInput);

    return data;
  } catch (error) {
    throw getMessageFromError(error);
  }
};
