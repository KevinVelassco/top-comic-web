import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface CheckError {
  ok: false;
}

interface CheckSuccess {
  ok: true;
  user: User;
  token: string;
}

export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    const localToken = localStorage.getItem('token');

    if (!localToken) return { ok: false };

    const { data } = await tesloApi.post<AuthResponse>('/auth/check-auth-status');

    return {
      ok: true,
      user: data.user,
      token: data.access_token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      };
    }

    throw new Error('No se pudo verificar la sesión');
  }
};
