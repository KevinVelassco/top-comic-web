<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Crea tu cuenta</h2>

      <form @submit.prevent="onRegister">
        <div class="mb-4">
          <label class="block mb-2 text-gray-700">Nombre</label>
          <CustomInput v-model="name" v-bind="nameAttrs" :error="errors.name" />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-gray-700">Apellido</label>
          <CustomInput v-model="lastName" v-bind="lastNameAttrs" :error="errors.lastName" />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-gray-700">Correo electrónico</label>
          <CustomInput v-model="email" v-bind="emailAttrs" :error="errors.email" />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-gray-700">Contraseña</label>
          <CustomInput v-model="password" v-bind="passwordAttrs" :error="errors.password" />
        </div>

        <div class="card-actions justify-center">
          <CustomButton
            type="submit"
            variant="primary"
            :loading="meta.valid && isSubmitting"
            :disabled="meta.valid && isSubmitting"
            >Crear cuenta</CustomButton
          >
        </div>
      </form>

      <div class="mt-5">
        <span class="me-1">¿Ya tienes una cuenta?</span>
        <RouterLink :to="{ name: 'login' }" class="link link-hover font-semibold"
          >Inicia sesión
        </RouterLink>
      </div>
    </div>
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

const authStore = useAuthStore();
const toast = useToast();

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
  const { ok, message } = await authStore.register(value);

  if (ok) return toast.info('Usuario registrado.');

  toast.error(message);
});
</script>
