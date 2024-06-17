<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Inicia sesión en tu cuenta</h2>

      <form @submit.prevent="onLogin">
        <div class="mb-4">
          <CustomInput
            id="email"
            label="Correo electrónico"
            v-model="email"
            v-bind="emailAttrs"
            :error="errors.email"
          />
        </div>

        <div class="mb-4">
          <CustomInput
            id="password"
            label="Contraseña"
            v-model="password"
            v-bind="passwordAttrs"
            :error="errors.password"
          />
        </div>

        <div class="card-actions justify-center">
          <CustomButton
            type="submit"
            variant="primary"
            :loading="meta.valid && isSubmitting"
            :disabled="meta.valid && isSubmitting"
            >Iniciar sesión</CustomButton
          >
        </div>
      </form>

      <div class="text-blue-500">
        <a href="#" class="hover:underline">¿Olvidaste la contraseña?</a>
      </div>

      <div class="text-blue-500">
        <RouterLink :to="{ name: 'register' }" class="hover:underline">Crear Cuenta</RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import { useForm } from 'vee-validate';
import { loginUserSchema } from '../schemas/login-user.schema';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import { toTypedSchema } from '@vee-validate/yup';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const { defineField, errors, handleSubmit, isSubmitting, meta } = useForm({
  validationSchema: toTypedSchema(loginUserSchema),
  initialValues: {
    email: 'andres@gmail.com',
    password: '12345678',
  },
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onLogin = handleSubmit(async (value) => {
  const ok = await authStore.login(value.email, value.password);

  if (ok) return router.replace({ name: 'dashboard' });

  toast.error('Usuario/Contraseña no son correctos');
});
</script>
