<template>
  <div :class="{ 'admin-container': isAdmin, 'client-container': !isAdmin }">
    <div
      v-for="product in store.products"
      :key="product.id"
      class="product-container"
    >
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
      <button @click="addToCart(product)" v-if="!isAdmin" class="button">Add to Cart</button>
      <button @click="editProduct(product)" v-if="isAdmin" class="button">
        Edit
      </button>
      <button @click="deleteProduct(product)" v-if="isAdmin" class="button-delete ">
        Delete
      </button>

      <!-- edit form -->
      <div v-if="isEditing && product.id === editedProductId" class="edit-form">
        <h3>Edit Product</h3>
        <input v-model="editedProduct.name" placeholder="Name" />
        <input v-model.number="editedProduct.price" placeholder="Price" />
        <input v-model="editedProduct.description" placeholder="Description" />
        <button @click="saveEditedProduct" class="button">Save</button>
        <button @click="cancelEdit" class="button-delete ">Cancel</button>
      </div>
    </div>

    <div v-if="isAdmin" class="admin-container">
      <h2>Add New Product</h2>
      <input v-model="newProduct.id" placeholder="Id" />
      <input v-model="newProduct.name" placeholder="Name" />
      <input v-model.number="newProduct.price" placeholder="Price" />
      <input v-model="newProduct.description" placeholder="Description" />
      <button @click="handleAddProduct" class="button">Create</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductStore } from "../../store/productStore.ts";
import { Menu } from "../../services/menuServices/menuServices.ts";

const store = useProductStore();
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

const isEditing = ref(false);
const editedProductId = ref("");
const editedProduct = ref<Menu>({
  id: "",
  name: "",
  price: 0,
  description: "",
});

const newProduct = ref<Menu>({
  id: "",
  name: "",
  price: 0,
  description: "",
});

const saveEditedProduct = async () => {
  try {
    // Update the product in Firestore using editedProduct
    store.editProduct(editedProduct.value);
    // Reset the editing state
    isEditing.value = false;
    editedProductId.value = "";
    editedProduct.value = {
      id: "",
      name: "",
      price: 0,
      description: "",
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
  };
};

const addToCart = (product: Menu) => {
//   TODO => implement add to cart
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

.button {
  background-color: $dark-blue;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-delete {
  background-color: $red;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: $green;
}
</style>
