<template>
  <header-component></header-component>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
/*
   imports
*/

import { onMounted } from "vue";
import HeaderComponent from "./common-templates/HeaderComponent.vue";
import userServices from "./services/userServices/userServices";
import menuServices from "./services/menuServices/menuServices";
import { useProductStore } from "./store/productStore.ts";



onMounted(() => {
  userServices.getAll();
  menuServices.getAll();
  useProductStore().getProductList();
});
</script>

<style scoped></style>
