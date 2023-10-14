<template>
  <div class="edit-product-modal" v-if="store.isEditing">
    <div class="modal-content">
      <h2>Edit Product</h2>
      <div class="input-container">
        <input v-model="editedProduct.name" placeholder="Name" />
        <input v-model.number="editedProduct.price" placeholder="Price" />
        <input v-model="editedProduct.description" placeholder="Description" />
        <select v-model="editedProduct.category">
          <option value="main dishes">Main Dishes</option>
          <option value="desserts">Desserts</option>
          <option value="salads">Salads</option>
          <option value="drinks">Drinks</option>
        </select>
      </div>
      <div class="button-container">
        <ButtonComponent
          btnStyle="default-button-green"
          @click="saveEditedProductClicked"
          >Save</ButtonComponent
        >
        <ButtonComponent btnStyle="button-danger" @click="cancelEditClicked"
          >Cancel</ButtonComponent
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "../../store/productStore.ts";
import ButtonComponent from "../../common-templates/ButtonComponent.vue";

const store = useProductStore();
const editedProduct = computed(() => store.editedProduct);

const saveEditedProductClicked = () => {
  store.editProduct(editedProduct.value);
  store.isEditing = false;
  store.resetEditedProduct();
};

const cancelEditClicked = () => {
  store.isEditing = false;
  store.resetEditedProduct();
};
</script>

<style scoped lang="scss">
@import "../../styles/_variables.scss";

.edit-product-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  height: 400px;
  width: 300px;
  text-align: center;
  position: relative;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px;
}

.input-container input {
  width: 200px;
  height: 15px;
  border-radius: 5px;
  border: 2px solid $dark-blue;
  padding: 5px;
  margin: 10px;
  text-align: center;

  &:focus {
    outline: none;
  }
}

.input-container select {
  width: 215px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid $dark-blue;
  padding: 5px;
  margin: 10px;
  text-align: center;

  &:focus {
    outline: none;
  }
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 30px 10px;
}

h2 {
  color: $dark-blue;
  margin-bottom: 10px;
  font-weight: 900;
  margin-bottom: 40px;
}
</style>
