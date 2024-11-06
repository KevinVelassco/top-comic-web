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
      const response = await loginAction({ email, password });

      authStatus.value = AuthStatus.Authenticated;
      user.value = response.user;
      token.value = response.access_token;

      localStorage.setItem('token', response.access_token);

      return {
        ok: true,
      };
    } catch (error) {
      logout();
      return { ok: false, error };
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

      authStatus.value = AuthStatus.Authenticated;
      user.value = response.user;
      token.value = response.access_token;

      localStorage.setItem('token', response.access_token);

      return {
        ok: true,
      };
    } catch (error) {
      logout();
      return { ok: false, error };
    }
  };

  return {
    //Properties
    user,
    token,
    authStatus,

    //Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isAdmin: computed(() => user.value?.isAdmin ?? false),
    username: computed(() => user.value?.name + ' ' + user.value?.lastName),

    //Methods
    login,
    logout,
    register,
    checkAuthStatus,
  };
});
