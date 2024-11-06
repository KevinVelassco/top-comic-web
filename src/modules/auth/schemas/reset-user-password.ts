import { object, string } from 'yup';

export const ResetUserPasswordSchema = object().shape({
  email: string().email().required(),
});
