<template>
  <div class="product-container">
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
    <p>Category: {{ product.category }}</p>
    <ButtonComponent
      btn-style="default-button-db"
      @click="addToCartClicked"
      v-if="!isAdmin"
    >
      Add to Cart
    </ButtonComponent>
    <ButtonComponent
      btn-style="default-button-db"
      @click="editProductClicked"
      v-if="isAdmin"
    >
      Edit
    </ButtonComponent>
    <ButtonComponent
      btn-style="button-danger"
      @click="deleteProductClicked"
      v-if="isAdmin"
    >
    Delete
    </ButtonComponent>

    <!-- Edit Modal -->
    <div
      v-if="isEditing && product.id === editedProductId"
      class="modal-container"
    >
      <div class="modal-content">
        <h3>Edit Product</h3>
        <div class="input-container">
          <input v-model="editedProduct.name" placeholder="Name" />
          <input v-model.number="editedProduct.price" placeholder="Price" />
          <input
            v-model="editedProduct.description"
            placeholder="Description"
          />
          <select v-model="editedProduct.category">
            <option value="main dishes">Main Dishes</option>
            <option value="desserts">Desserts</option>
            <option value="salads">Salads</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>
        <div class="button-container">
          <ButtonComponent
            btn-style="default-button-db"
            @click="saveEditedProductClicked"
            >Save</ButtonComponent
          >
          <ButtonComponent @click="cancelEditClicked" btn-style="button-danger"
            >Cancel</ButtonComponent
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import ButtonComponent from "../../common-templates/ButtonComponent.vue";

const { product, isAdmin, isEditing, editedProductId, editedProduct } =
  defineProps([
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

<style scoped lang="scss">
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
</style>
