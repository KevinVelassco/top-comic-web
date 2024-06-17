import { tesloApi } from '@/api/tesloApi';
import type { UsersResponse } from '@/modules/auth/interfaces/users.response';

export const getUsersAction = async (
  page: number = 1,
  limit: number = 5,
): Promise<UsersResponse> => {
  try {
    const { data } = await tesloApi.get<UsersResponse>('/user', {
      params: {
        limit,
        page,
      },
    });

    return data;
  } catch (error) {
    throw new Error('Error getting users');
  }
};
