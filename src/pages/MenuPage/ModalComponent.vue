<template>
  <div class="product-modal" v-if="show">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>
      <form>

      </form>
      <div class="input-container">
        <input v-model="product.name" placeholder="Name" />
        <input v-model.number="product.price" placeholder="Price" />
        <input v-model="product.description" placeholder="Description" />
        <select v-model="product.category">
          <option value="main dishes">Main Dishes</option>
          <option value="desserts">Desserts</option>
          <option value="salads">Salads</option>
          <option value="drinks">Drinks</option>
        </select>
        <input type="file" @change="handleFileChange">
      </div>
      <div class="button-container">
        <ButtonComponent btnStyle="default-button-green" @click="saveClicked">{{ saveButtonText }}</ButtonComponent>
        <ButtonComponent btnStyle="button-danger" @click="reset">Cancel</ButtonComponent>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductStore } from "@/store/productStore";
import ButtonComponent from "@/common-templates/ButtonComponent.vue";

const store = useProductStore();
const product = ref(store.newProduct);
const show = computed(() => store.modalVisibility);
const modalTitle = computed(() => store.isEditing ? "Edit Product" : "Add New Product");
const saveButtonText = computed(() => store.isEditing ? "Save" : "Add");

if (store.isEditing) {
  product.value = store.editedProduct;
} else {
  product.value = store.newProduct;
}

const saveClicked = () => {
  if (store.isEditing) {
    store.editProduct(product.value);
  } else {
    store.addProduct(product.value, product.value.imgSrc );
    console.log(product.value.imgSrc)
  }
  reset();
};

const handleFileChange = (event:any) => {
  const file = event.target.files[0]; 
  if (file) {
    product.value.imgSrc = file;
  }
}

const reset = () => {
  store.resetNewProduct();
  store.isEditing = false;
  store.showAddModal = false;
  product.value = store.isEditing ? store.editedProduct : store.newProduct;
};

</script>
  
<style scoped lang="scss">
@import "../../styles/_variables.scss";

.product-modal {
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
  