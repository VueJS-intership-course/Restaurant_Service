<template>
  <div :class="{ 'admin-container': isAdmin, 'client-container': !isAdmin }">
    <div class="filters">
      <label class="category-filter" for="category-filter">Filter by Category:</label>
      <select id="category-filter" v-model="selectedCategory">
        <option value="all">All</option>
        <option value="main dishes">Main Dishes</option>
        <option value="desserts">Desserts</option>
        <option value="salads">Salads</option>
        <option value="drinks">Drinks</option>
      </select>

      <label class="category-filter" for="search-input">Search by Name or Description:</label>
      <input
        id="search-input"
        v-model="searchQuery"
        @input="performSearch"
        placeholder="Search..."
      />
      <ButtonComponent
        class="addNewProductButton"
        v-if="isAdmin"
        @click="showAddProductModal"
        btn-style="default-button-db"
        >Add New Product</ButtonComponent
      >
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
    <!-- add New Product Modal -->
    <div v-if="showAddModal" class="modal-container">
      <div class="modal-content">
        <h2>Add New Product</h2>
        <div class="input-container">
          <input v-model="newProduct.name" placeholder="Name" />
          <input v-model.number="newProduct.price" placeholder="Price" />
          <input v-model="newProduct.description" placeholder="Description" />
          <select v-model="newProduct.category">
            <option value="main dishes">Main Dishes</option>
            <option value="desserts">Desserts</option>
            <option value="salads">Salads</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>
        <div class="button-container">
          <ButtonComponent
            @click="handleAddProduct"
            btn-style="default-button-db"
            >Add</ButtonComponent
          >
          <ButtonComponent @click="closeAddModal" btn-style="button-danger"
            >Cancel</ButtonComponent
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductStore } from "../../store/productStore.ts";
import { Menu } from "../../services/menuServices/menuServices.ts";
import { useOrderStore } from "../../store/orderStore.ts";
import ButtonComponent from "../../common-templates/ButtonComponent.vue";
import ProductItem from "./MenuItem.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const showAddModal = ref(false);

const showAddProductModal = () => {
  showAddModal.value = true;
};

const closeAddModal = () => {
  showAddModal.value = false;
};

const store = useProductStore();
const orderStore = useOrderStore();

const isAdmin = computed(() => true); //TODO => implement check for admin

const handleAddProduct = () => {
  showAddProductModal();
  store.addProduct(newProduct.value);
  closeAddModal();

  newProduct.value = {
    id: "",
    name: "",
    price: 0,
    description: "",
    category: "main dishes",
  };
};

const deleteProduct = (product: Menu) => {
  store.removeProduct(product);
  toast(`${product.name} has been deleted from the menu!`, {
    autoClose: 600,
  });
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
        product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  } else {
    return store.products.filter(
      (product) =>
        product.category === selectedCategory.value &&
        (product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }
});

const performSearch = () => {
  selectedCategory.value = "all";
};

const addToCart = (product: Menu) => {
  orderStore.addToOrder(product);
  toast(`${product.name} has been added to cart.`, {
    autoClose: 600,
  });
};
</script>

<style scoped lang="scss">
@import "../../styles/_variables.scss";

.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  text-align: center;
  position: relative;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

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
