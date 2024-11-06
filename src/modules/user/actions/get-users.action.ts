import { comicApi } from '@/api/comicApi';
import type { UsersResponse } from '@/modules/auth/interfaces/users.response';

interface GetUsersInput {
  page?: number;
  limit?: number;
  q?: string;
  filters?: Record<string, any>;
}

export const getUsersAction = async (getUsersInput?: GetUsersInput): Promise<UsersResponse> => {
  const { page = 1, limit = 10, q, filters } = getUsersInput ?? {};
  console.log(filters, q);
  try {
    const { data } = await comicApi.get<UsersResponse>('/user', {
      params: {
        limit,
        page,
        q,
      },
    });

    return data;
  } catch (error) {
    throw new Error('Error getting users');
  }
};
