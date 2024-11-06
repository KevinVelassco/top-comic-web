<template>
  <div
    class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <form class="space-y-6" @submit.prevent="onRegister">
      <h5 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">
        Crea tu cuenta
      </h5>

      <div class="text-center text-sm font-medium text-gray-500 dark:text-gray-300">
        ¿Ya tienes una cuenta?

        <RouterLink
          :to="{ name: 'login' }"
          class="text-blue-600 decoration-2 hover:underline dark:text-blue-500"
          >Inicia sesión</RouterLink
        >
      </div>

      <div>
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Nombre</label
        >
        <CustomInput id="name" v-model="name" v-bind="nameAttrs" :error="errors.name" />
      </div>

      <div>
        <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Apellido</label
        >
        <CustomInput
          id="lastName"
          v-model="lastName"
          v-bind="lastNameAttrs"
          :error="errors.lastName"
        />
      </div>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Correo Electronico</label
        >

        <CustomInput id="email" v-model="email" v-bind="emailAttrs" :error="errors.email" />
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Contraseña</label
        >
        <CustomInput
          type="password"
          id="password"
          v-model="password"
          v-bind="passwordAttrs"
          :error="errors.password"
        />
      </div>

      <CustomButton
        type="submit"
        class="w-full"
        variant="primary"
        :loading="meta.valid && isSubmitting"
        :disabled="meta.valid && isSubmitting"
        >Crear cuenta</CustomButton
      >

      <CustomErrorMessage :error="error" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';

import { useAuthStore } from '../stores/auth.store';
import { registerUserSchema } from '../schemas/register-user.schema';

import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import CustomErrorMessage from '@/modules/common/components/CustomErrorMessage.vue';
import { ref } from 'vue';

const authStore = useAuthStore();
const toast = useToast();
const error = ref();

const { defineField, errors, handleSubmit, isSubmitting, meta } = useForm({
  validationSchema: toTypedSchema(registerUserSchema),
  initialValues: {
    name: '',
    lastName: '',
    email: '',
    password: '',
  },
});

const [name, nameAttrs] = defineField('name');
const [lastName, lastNameAttrs] = defineField('lastName');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onRegister = handleSubmit(async (value) => {
  const response = await authStore.register(value);

  if (response.ok) return toast.info('Usuario registrado.');

  error.value = response.error;
});
</script>
