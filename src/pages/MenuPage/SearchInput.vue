<template>
    <div class="search-input">
      <label for="search-input">Search by Name or Description:</label>
      <input id="search-input" v-model="searchQuery" @input="performSearch" placeholder="Search...">
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useProductStore } from '../../store/productStore.ts';
  
  const store = useProductStore();
  const searchQuery = ref(store.searchQuery);
  
  const performSearch = () => {
    store.searchQuery = searchQuery.value;
  };
  </script>
  
  <style scoped lang="scss">
  @import "../../styles/_variables.scss";

.search-input {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

#search-input {
  width: 150px;
  height: 15px;
  border-radius: 5px;
  border: 2px solid $dark-blue;
  padding: 5px;
  margin-left: 5px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: $dark-blue;
  }
}

label {
  color: $dark-blue;
  margin-right: 5px;
  font-size: large;
}
  </style>