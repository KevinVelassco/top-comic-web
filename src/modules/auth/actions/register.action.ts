import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSuccess {
  ok: true;
  user: User;
  token: string;
}

export interface RegisterUserInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerAction = async (
  registerUserInput: RegisterUserInput,
): Promise<RegisterError | RegisterSuccess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', registerUserInput);

    return {
      ok: true,
      user: data.user,
      token: data.access_token,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        ok: false,
        message: 'No se pudo crear el usuario',
      };
    }

    console.log(error);
    throw new Error('No se pudo realizar la petición');
  }
};
