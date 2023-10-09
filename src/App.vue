<template>
  <button-component btn-style="default-button">BUTTON</button-component>
  <button-component btn-style="default-button-small">BUTTON</button-component>
  <button-component btn-style="default-button-large">BUTTON</button-component>
  <button-component btn-style="default-button-medium">BUTTON</button-component>
  <button-component btn-style="button-danger">DELETE</button-component>
  <input-field />
  <input-field input-style="input-large" />
  <img src="./assets/Image_20231009_100755_762.png" alt="logo" />
</template>

<script setup lang="ts">
import ButtonComponent from "./common-templates/ButtonComponent.vue";
import InputField from "./common-templates/InputField.vue";
</script>

<style scoped></style>
