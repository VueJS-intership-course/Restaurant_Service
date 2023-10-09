<template>
  <header-component></header-component>
  <RouterView></RouterView>
  <!-- <button-component btn-style="default-button">BUTTON</button-component> -->
</template>

<script setup lang="ts">
/*
   imports
*/

import { onMounted } from "vue";
// import ButtonComponent from "./common-templates/ButtonComponent.vue";
import HeaderComponent from "./common-templates/HeaderComponent.vue";
import userServices from "./services/userServices/userServices";

onMounted(() => {
  userServices.getAll();
});
</script>

<style scoped></style>
