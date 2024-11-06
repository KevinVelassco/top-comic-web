<template>
  <div
    class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <form class="space-y-6">
      <h5 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">
        Recupera tu contraseña
      </h5>

      <div class="text-center text-sm font-medium text-gray-500 dark:text-gray-300">
        ¿Recuerdas tu contraseña?

        <RouterLink
          :to="{ name: 'login' }"
          class="text-blue-600 decoration-2 hover:underline dark:text-blue-500"
          >Inicia sesión</RouterLink
        >
      </div>

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

      <CustomButton class="w-full" variant="primary">Restablecer contraseña</CustomButton>
    </form>
  </div>
</template>
<script lang="ts" setup>
import CustomInput from '@/modules/common/components/CustomInput.vue';
import { useForm } from 'vee-validate';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import { toTypedSchema } from '@vee-validate/yup';
import { ResetUserPasswordSchema } from '../schemas/reset-user-password';

const { defineField, errors } = useForm({
  validationSchema: toTypedSchema(ResetUserPasswordSchema),
  initialValues: {
    email: '',
  },
});

const [email, emailAttrs] = defineField('email');
</script>
