import { comicApi } from '@/api/comicApi';
import type { AuthResponse } from '../interfaces';
import { getMessageFromError } from '@/modules/common/helpers';

interface LoginAuthInput {
  email: string;
  password: string;
}

export const loginAction = async (loginAuthInput: LoginAuthInput): Promise<AuthResponse> => {
  try {
    const { data } = await comicApi.post<AuthResponse>('/auth/login', loginAuthInput);

    return data;
  } catch (error) {
    console.log(error);
    throw getMessageFromError(error);
  }
};
