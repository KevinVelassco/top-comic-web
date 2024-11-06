<template>
  <form @submit.prevent="onRegister">
    <CustomInput label="Nombre" v-model="name" v-bind="nameAttrs" :error="errors.name" />

    <CustomInput
      label="Apellido"
      v-model="lastName"
      v-bind="lastNameAttrs"
      :error="errors.lastName"
    />
    <CustomInput
      label="Correo electrónico"
      v-model="email"
      v-bind="emailAttrs"
      :error="errors.email"
    />

    <CustomInput
      label="Contraseña"
      v-model="password"
      v-bind="passwordAttrs"
      :error="errors.password"
    />

    <CustomErrorMessage :error="userCreateMutation.error.value" />

    <div class="flex justify-end mt-6">
      <CustomButton variant="secondary" class="me-2" @click="eventStore.emit('user-end-creating')"
        >Cancelar</CustomButton
      >

      <CustomButton
        type="submit"
        variant="primary"
        :loading="userCreateMutation.isPending.value"
        :disabled="userCreateMutation.isPending.value"
        >Aceptar</CustomButton
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';

import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import { createUserSchema } from '../schemas/create-user.schema';
import { useEventStore } from '@/modules/common/stores/event.store';
import { useUserMutation } from '../composables/useUserCreateMutation';
import CustomErrorMessage from '@/modules/common/components/CustomErrorMessage.vue';

const eventStore = useEventStore();

const userCreateMutation = useUserMutation();

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(createUserSchema),
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
  userCreateMutation.mutate(value);
});
</script>
