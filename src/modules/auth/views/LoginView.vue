<template>
  <div
    class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <form class="space-y-6" @submit.prevent="onLogin">
      <h5 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">
        Iniciar sesión
      </h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Correo Electronico</label
        >

        <CustomInput
          id="email"
          class="bg-gray-50"
          v-model="email"
          v-bind="emailAttrs"
          :error="errors.email"
        />
      </div>
      <div>
        <div class="flex items-start">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Contraseña</label
          >
          <RouterLink
            :to="{ name: 'password-recovery' }"
            class="ms-auto text-sm text-gray-500 hover:underline"
            >¿Has olvidado tu contraseña?</RouterLink
          >
        </div>

        <CustomInput
          type="text"
          class="bg-gray-50"
          id="password"
          v-model="password"
          v-bind="passwordAttrs"
          :error="errors.password"
        />
      </div>

      <CustomErrorMessage :error="error" />

      <CustomButton
        type="submit"
        class="w-full"
        variant="primary"
        :loading="meta.valid && isSubmitting"
        :disabled="meta.valid && isSubmitting"
        >Iniciar sesión</CustomButton
      >

      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        ¿No registrado?

        <RouterLink
          :to="{ name: 'register' }"
          class="text-blue-600 decoration-2 hover:underline dark:text-blue-500"
          >Crear una cuenta</RouterLink
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import { useForm } from 'vee-validate';
import { loginUserSchema } from '../schemas/login-user.schema';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import { toTypedSchema } from '@vee-validate/yup';
import { useRouter } from 'vue-router';
import CustomErrorMessage from '@/modules/common/components/CustomErrorMessage.vue';

const authStore = useAuthStore();
const router = useRouter();
const error = ref();

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
  const response = await authStore.login(value.email, value.password);

  if (response.ok) return router.replace({ name: 'comics' });

  error.value = response.error;
});
</script>
