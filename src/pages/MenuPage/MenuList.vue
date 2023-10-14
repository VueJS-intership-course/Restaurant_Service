<template>
    <div class="product-list">
      <div v-for="product in filteredProducts" :key="product.id">
        <menu-item :product="product" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useProductStore } from '../../store/productStore.ts';
  import MenuItem from './MenuItem.vue';
  
  const store = useProductStore();
  const filteredProducts = computed(() => store.filteredProducts);
  
  </script>
  
  <style scoped lang="scss">
  @import '../../styles/_variables.scss';
  .product-list {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-left: 30px;
  }
  </style>
