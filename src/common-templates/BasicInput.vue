<template>
  <label :for="name">{{ `${label}:` }}</label>
  <input v-model="value" :type="type" />
  <span>{{ errorMessage }}</span>
</template>
<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  name: String,
  type: String,
  label: String,
});

const { value, errorMessage } = useField(() => props.name as string);
</script>

<style lang="scss" scoped>
span {
  position: absolute;
  color: red;
  left: 0%;
}

input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 12rem;
}

label {
  font-size: larger;
  text-align: center;
  color: white;
  font-weight: bold;
}
</style>
