<template>
  <form @submit.prevent="onUpdated">
    <div class="mb-4">
      <label class="block mb-2 text-gray-700">Nombre</label>
      <CustomInput v-model="name" v-bind="nameAttrs" :error="errors.name" />
    </div>

    <div class="mb-4">
      <label class="block mb-2 text-gray-700">Apellido</label>
      <CustomInput v-model="lastName" v-bind="lastNameAttrs" :error="errors.lastName" />
    </div>

    <CustomErrorMessage :error="userUpdateMutation.error.value" />

    <div class="flex justify-end mt-6">
      <CustomButton variant="secondary" @click="eventStore.emit('user-end-updating')"
        >Cancelar</CustomButton
      >

      <CustomButton
        type="submit"
        variant="primary"
        :loading="userUpdateMutation.isPending.value"
        :disabled="userUpdateMutation.isPending.value"
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
import { useEventStore } from '@/modules/common/stores/event.store';
import type { User } from '@/modules/auth/interfaces';
import { ref, watch } from 'vue';
import { updateUserSchema } from '../schemas/update-user.schema';
import { useUserUpdateMutation } from '../composables/useUserUpdateMutation';
import CustomErrorMessage from '@/modules/common/components/CustomErrorMessage.vue';

interface Props {
  initialData: User;
  page: number;
}

const props = defineProps<Props>();
const eventStore = useEventStore();
const userUpdateMutation = useUserUpdateMutation(props.page);

const formData = ref({ ...props.initialData });

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(updateUserSchema),
  initialValues: {
    name: formData.value.name,
    lastName: formData.value.lastName,
  },
});

const [name, nameAttrs] = defineField('name');
const [lastName, lastNameAttrs] = defineField('lastName');

const onUpdated = handleSubmit(async (value) => {
  const { authUid } = formData.value;

  userUpdateMutation.mutate({ userId: authUid, ...value });
});

watch(props.initialData, (newValue) => {
  formData.value = { ...newValue };
});
</script>
