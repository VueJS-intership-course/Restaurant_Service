<template>
  <input v-model="value" :type="type" />
  <span>{{ errorMessage }}</span>
</template>
<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  name: String,
  type: String,
});

const { value, errorMessage } = useField(() => props.name);
</script>

<style lang="scss" scoped>
span {
  color: red;
}
</style>
