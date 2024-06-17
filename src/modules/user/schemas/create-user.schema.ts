import { object, string } from 'yup';

export const createUserSchema = object().shape({
  name: string().min(5).required(),
  lastName: string().min(5).required(),
  email: string().email().required(),
  password: string().min(8).required(),
});
