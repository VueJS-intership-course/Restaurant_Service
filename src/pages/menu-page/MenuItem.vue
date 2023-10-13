<template>
  <div class="product-container">
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
    <p>Category: {{ product.category }}</p>
    <ButtonComponent btn-style="default-button-db" @click="addToCartClicked" v-if="!isAdmin">
      Add to Cart
    </ButtonComponent>
    <ButtonComponent btn-style="default-button-db" @click="editProductClicked" v-if="isAdmin">
      Edit
    </ButtonComponent>
    <ButtonComponent btn-style="button-danger" @click="deleteProductClicked" v-if="isAdmin">
      Delete
    </ButtonComponent>

    <div v-if="isEditing && product.id === editedProductId" class="edit-form">
      <h3>Edit Product</h3>
      <input v-model="editedProduct.name" placeholder="Name" />
      <input v-model.number="editedProduct.price" placeholder="Price" />
      <input v-model="editedProduct.description" placeholder="Description" />
      <select v-model="editedProduct.category">
        <option value="main dishes">Main Dishes</option>
        <option value="desserts">Desserts</option>
        <option value="salads">Salads</option>
        <option value="drinks">Drinks</option>
      </select>
      <ButtonComponent btn-style="default-button-db" @click="saveEditedProductClicked"
        >Save</ButtonComponent
      >
      <ButtonComponent @click="cancelEditClicked" btn-style="button-danger"
        >Cancel</ButtonComponent
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ButtonComponent from "../../common-templates/ButtonComponent.vue";

const { product, isAdmin, isEditing, editedProductId, editedProduct } = defineProps([
  "product",
  "isAdmin",
  "isEditing",
  "editedProductId",
  "editedProduct",
]);

const emits = defineEmits([
  "addToCart",
  "editProduct",
  "deleteProduct",
  "saveEditedProduct",
  "cancelEdit",
]);

const addToCartClicked = () => {
  emits("addToCart", product);
};

const editProductClicked = () => {
  emits("editProduct", product);
};

const deleteProductClicked = () => {
  emits("deleteProduct", product);
};

const saveEditedProductClicked = () => {
  emits("saveEditedProduct", editedProduct);
};

const cancelEditClicked = () => {
  emits("cancelEdit");
};
</script>
