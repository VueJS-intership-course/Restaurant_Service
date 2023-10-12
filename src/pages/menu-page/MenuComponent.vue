<template>
  <div :class="{ 'admin-container': isAdmin, 'client-container': !isAdmin }">
    <div class="filters">
      <label class="category-filter" for="category-filter"
        >Filter by Category:</label
      >
      <select id="category-filter" v-model="selectedCategory">
        <option value="all">All</option>
        <option value="main dishes">Main Dishes</option>
        <option value="desserts">Desserts</option>
        <option value="salads">Salads</option>
        <option value="drinks">Drinks</option>
      </select>

      <label class="category-filter" for="search-input"
        >Search by Name or Description:</label
      >
      <input
        id="search-input"
        v-model="searchQuery"
        @input="performSearch"
        placeholder="Search..."
      />
    </div>
  </div>
  <div v-for="product in filteredProducts" :key="product.id">
    <product-item
      :product="product"
      :isAdmin="isAdmin"
      :isEditing="isEditing"
      :editedProductId="editedProductId"
      :editedProduct="editedProduct"
      @addToCart="addToCart"
      @editProduct="editProduct"
      @deleteProduct="deleteProduct"
      @saveEditedProduct="saveEditedProduct"
      @cancelEdit="cancelEdit"
    ></product-item>
  </div>

  <div v-if="isAdmin" class="admin-container">
    <h2>Add New Product</h2>
    <input v-model="newProduct.id" placeholder="Id" />
    <input v-model="newProduct.name" placeholder="Name" />
    <input v-model.number="newProduct.price" placeholder="Price" />
    <input v-model="newProduct.description" placeholder="Description" />
    <select v-model="newProduct.category">
      <option value="main dishes">Main Dishes</option>
      <option value="desserts">Desserts</option>
      <option value="salads">Salads</option>
      <option value="drinks">Drinks</option>
    </select>
    <ButtonComponent btn-style="default-button-db" @click="handleAddProduct"
      >Create</ButtonComponent
    >
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductStore } from "../../store/productStore.ts";
import { Menu } from "../../services/menuServices/menuServices.ts";
import { useOrderStore } from "../../store/orderStore.ts";
import ButtonComponent from "../../common-templates/ButtonComponent.vue";
import ProductItem from "./MenuItem.vue";

const store = useProductStore();
const orderStore = useOrderStore();

const isAdmin = computed(() => true); //TODO => implement check for admin

const handleAddProduct = () => {
  store.addProduct(newProduct.value);
};

const deleteProduct = (product: Menu) => {
  store.removeProduct(product);
};

const editProduct = (product: Menu) => {
  isEditing.value = true;
  editedProductId.value = product.id;
  editedProduct.value = { ...product };
};

const selectedCategory = ref("all");
const isEditing = ref(false);
const editedProductId = ref("");
const editedProduct = ref<Menu>({
  id: "",
  name: "",
  price: 0,
  description: "",
  category: "main dishes",
});

const newProduct = ref<Menu>({
  id: "",
  name: "",
  price: 0,
  description: "",
  category: "main dishes",
});

const saveEditedProduct = async () => {
  try {
    store.editProduct(editedProduct.value);
    isEditing.value = false;
    editedProductId.value = "";
    editedProduct.value = {
      id: "",
      name: "",
      price: 0,
      description: "",
      category: "main dishes",
    };
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  editedProductId.value = "";
  editedProduct.value = {
    id: "",
    name: "",
    price: 0,
    description: "",
    category: "main dishes",
  };
};

const searchQuery = ref("");
const filteredProducts = computed(() => {
  if (!store.products) return [];
  if (!selectedCategory.value || selectedCategory.value === "all") {
    return store.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  } else {
    return store.products.filter(
      (product) =>
        product.category === selectedCategory.value &&
        (product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()))
    );
  }
});

const performSearch = () => {
  selectedCategory.value = "all";
};

const addToCart = (product: Menu) => {
  orderStore.addToOrder(product);
};
</script>

<style lang="scss">
@import "../../styles/_variables.scss";

.admin-container {
  background-color: $light-green;
  padding: 20px;
  border-radius: 5px;
}

.client-container {
  background-color: $blue;
  padding: 20px;
  border-radius: 5px;
}

.product-container {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.product-container h2 {
  color: $dark-blue;
}

.product-container p {
  color: $green;
}

.edit-form {
  background-color: $yellow;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.edit-form input {
  width: 100%;
  margin-bottom: 10px;
}

.filters {
  padding: 15px;
}

.category-filter {
  font-size: large;
  margin: 15px;
  color: $dark-blue;
}
</style>
