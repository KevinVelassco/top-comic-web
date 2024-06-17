import { tesloApi } from '@/api/tesloApi';
import type { User } from '@/modules/auth/interfaces';
import { getMessageFromError } from '@/modules/common/helpers';

export interface UpdateUserInput {
  userId: string;
  name: string;
  lastName: string;
}

export const updateUserAction = async (updateUserInput: UpdateUserInput): Promise<User> => {
  try {
    const { userId, ...rest } = updateUserInput;

    const { data } = await tesloApi.patch<User>(`/user/${userId}`, rest);

    return data;
  } catch (error) {
    throw getMessageFromError(error);
  }
};
