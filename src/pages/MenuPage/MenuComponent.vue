<template>
  <div class="wrapper">
    <div class="header2">
      <div class="filter-search">
        <CategoryFilter />
        <SearchInput />
      </div>
      <ButtonComponent
        btn-style="default-button-db"
        v-if="store.isAdmin"
        @click="showAddProductModal"
      > Add New Product
      </ButtonComponent>
    </div>
    <MenuList />
    <AddProductModal v-if="showAddModal" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProductStore } from "../../store/productStore.ts";
import CategoryFilter from "./CategoryFilter.vue";
import SearchInput from "./SearchInput.vue";
import MenuList from "./MenuList.vue";
import AddProductModal from "./AddProductModal.vue";
import ButtonComponent from "../../common-templates/ButtonComponent.vue";

const store = useProductStore();
store.getProductList();

const showAddProductModal = () => {
  store.showAddModal = true;
};

const showAddModal = computed(() => store.showAddModal);
</script>

<style scoped lang="scss">
@import "../../styles/_variables.scss";

.wrapper {
  display: flex;
  flex-direction: column;
  background-color: $light-green;
}

.filter-search {
  display: flex;
  align-items: center;
  margin: 20px;
}

.header2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 30px
}


</style>
