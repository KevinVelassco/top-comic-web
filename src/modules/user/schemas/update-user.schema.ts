import { object, string } from 'yup';

export const updateUserSchema = object().shape({
  name: string().min(5).required(),
  lastName: string().min(5).required(),
});
