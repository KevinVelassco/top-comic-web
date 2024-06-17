import { tesloApi } from '@/api/tesloApi';
import type { User } from '@/modules/auth/interfaces';
import { getMessageFromError } from '@/modules/common/helpers';

export const deleteUserAction = async (userId: string): Promise<User> => {
  try {
    const { data } = await tesloApi.delete<User>(`/user/${userId}`);
    return data;
  } catch (error) {
    throw getMessageFromError(error);
  }
};
