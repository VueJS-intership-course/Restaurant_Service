<template>
  <input type="text" :class="inputStyle" />
</template>

<script setup lang="ts">
defineProps({
  inputStyle: {
    type: String,
    default: "default-input",
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/_variables.scss";

.default-input {
  border: 2px solid $dark-blue;
  padding: 6px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.input-large {
  border: 2px solid $dark-blue;
  padding: 8px 30px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
