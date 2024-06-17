import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../interfaces';
import { AuthStatus } from '../interfaces/auth.status.enum';
import { loginAction } from '../actions';
import { registerAction, type RegisterUserInput } from '../actions/register.action';
import { checkAuthAction } from '../actions/check-auth.action';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref('');

  const login = async (email: string, password: string) => {
    try {
      const response = await loginAction(email, password);
      if (!response.ok) return logout();

      authStatus.value = AuthStatus.Authenticated;
      user.value = response.user;
      token.value = response.token;

      localStorage.setItem('token', response.token);

      return true;
    } catch (error) {
      return logout();
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';

    localStorage.removeItem('token');

    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResponse = await checkAuthAction();

      if (!statusResponse.ok) {
        logout();
        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      user.value = statusResponse.user;
      token.value = statusResponse.token;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  const register = async (registerUserInput: RegisterUserInput) => {
    try {
      const response = await registerAction(registerUserInput);

      if (!response.ok) {
        logout();
        return { ok: false, message: response.message };
      }

      authStatus.value = AuthStatus.Authenticated;
      user.value = response.user;
      token.value = response.token;

      localStorage.setItem('token', response.token);

      return {
        ok: true,
        message: '',
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Error al registrar el usuario',
      };
    }
  };

  return {
    user,
    token,
    authStatus,

    //Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isAdmin: computed(() => user.value?.isAdmin ?? false),
    username: computed(() => user.value?.name + ' ' + user.value?.lastName),
    login,
    logout,
    register,
    checkAuthStatus,
  };
});
