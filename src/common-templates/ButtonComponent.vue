<template>
  <button class="btn" :style="btnStyle">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  btnStyle: {
    type: String,
    default: "default-button",
  },
});
</script>

<style lang="scss" scoped>

.default-button {
  color: $base-color1;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.default-button-small {
//todo
}

.default-button-large {
//todo
}
.button-danger{
//todo
}
</style>
