<template>
    <div class="category-filter">
      <label for="category-filter">Filter by Category:</label>
      <select id="category-filter" v-model="selectedCategory">
        <option value="all">All</option>
        <option value="main dishes">Main Dishes</option>
        <option value="desserts">Desserts</option>
        <option value="salads">Salads</option>
        <option value="drinks">Drinks</option>
      </select>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useProductStore } from '../../store/productStore.ts';
  
  
  const store = useProductStore();
  const selectedCategory = ref(store.selectedCategory);
  
  watch(selectedCategory, (newVal) => {
    store.selectedCategory = newVal;
  });
  </script>

  <style scoped lang="scss">
  @import "../../styles/_variables.scss";

.category-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

#category-filter {
  width: 120px;
  height: 25px;
  border-radius: 5px;
  border: 2px solid $dark-blue;
  text-align: center;
  margin-left: 5px;

  &:focus {
    outline: none;
  }
}

label {
  color: $dark-blue;
  margin-right: 5px;
  font-size: large;
}

  </style>

  