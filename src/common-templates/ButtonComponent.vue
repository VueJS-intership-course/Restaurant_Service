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
  margin: 5px;
  border-radius: 8px;
  cursor: pointer;
}

.default-button-db {
  background-color: $dark-blue;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 8px;
  cursor: pointer;
}
.default-button-small {
  background-color: $yellow;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: $dark-yellow;
  }
}

.default-button-medium {
  background-color: $light-green;
  color: white;
  border: none;
  padding: 15px 40px;
  margin: 5px;
  border-radius: 8px;
  cursor: pointer;
}

.default-button-green {
  background-color: $green;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 8px;
  cursor: pointer;
}
.button-danger {
  background-color: $red;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
