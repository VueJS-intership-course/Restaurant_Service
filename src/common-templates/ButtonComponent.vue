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
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.default-button-small {
  background-color: $yellow;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.default-button-medium {
  background-color: $light-green;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  cursor: pointer;
}

.default-button-large {
  background-color: $green;
  color: white;
  border: none;
  padding: 20px 60px;
  border-radius: 8px;
  cursor: pointer;
}
.button-danger {
  background-color: $red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
