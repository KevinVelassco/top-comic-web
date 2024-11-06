<template>
  <div>
    <label :for="id" v-if="label?.trim()" class="block mb-2 text-gray-900">{{ label }}</label>

    <CustomDropdown>
      <template #trigger="{ toggle }">
        <div class="relative w-full">
          <input
            :id="id"
            :value="modelValue"
            :placeholder="placeholder"
            :readonly="true"
            :disabled="!isValidDependency || disabled"
            :class="[
              'cursor-pointer appearance-none border rounded-md w-full py-2 pl-3 pr-11 text-gray-900  border-gray-300 disabled:bg-white',
              { 'disabled:bg-neutral-50': disabled },
              { 'border-red-600 border-2': error },
            ]"
            @click="toggle"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
            @blur="$emit('blur')"
          />

          <CustomButton @click="toggle" class="absolute inset-y-0 end-0 flex items-center px-3">
            <ArrowDownIcon class="fill-gray-600" />
          </CustomButton>
        </div>
      </template>
      <template #content="{ close }">
        <ul v-if="items?.length === 0" class="text-sm text-gray-700 -mx-1">
          <li class="px-3">No hay datos</li>
        </ul>
        <ul v-else @click="close" class="text-sm text-gray-700 -mx-1">
          <li
            v-for="item in items"
            :key="item.id"
            @click="selectedItem(item)"
            class="block rounded-md px-3 py-1.5 hover:bg-gray-100 cursor-pointer"
          >
            {{ item[props.selected.description] }}
          </li>
        </ul>
      </template>
    </CustomDropdown>

    <span class="flex items-center space-x-1 text-red-600 font-bold text-[15px]" v-if="error">
      <ExclamationIcon />
      <span>{{ capitalizedError }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ExclamationIcon from '../../icons/ExclamationIcon.vue';
import CustomButton from '../CustomButton.vue';
import ArrowDownIcon from '../../icons/ArrowDownIcon.vue';
import CustomDropdown from '../CustomDropdown.vue';

interface Selected {
  description: number | string;
}

interface Item {
  id: string | number;
  [key: string]: any;
}

interface Props {
  id?: string;
  items?: Item[];
  modelValue?: string | number;
  error?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  selected: Selected;
  dependencies?: number[] | string[];
}

const props = defineProps<Props>();

const capitalizedError = computed(() => {
  if (!props.error) return '';

  return props.error?.charAt(0)?.toUpperCase() + props.error?.slice(1);
});

const isValidDependency = computed(() => {
  const dependencies = props?.dependencies;

  if (!dependencies) return true;

  const isValid = !dependencies.some((dependency) => dependency === undefined);

  return isValid;
});

const emit = defineEmits(['update:modelValue', 'blur', 'item']);

const selectedItem = (item: Item) => {
  emit('update:modelValue', item[props.selected.description]);
  emit('item', item);
};
</script>
