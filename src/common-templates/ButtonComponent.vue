<template>
  <button class="btn" :class="btnStyle">
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
@import "../styles/_variables.scss";
.default-button {
  background-color: $blue;
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
