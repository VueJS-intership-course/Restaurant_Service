<template>
  <div class="product-modal" v-if="show">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>
      <Form @submit="saveClicked" :validationSchema="productSchema">
        <div class="input-container">
          <Field
            name="productName"
            type="text"
            v-model="product.name"
            placeholder="Name"
          />
          <ErrorMessage name="productName" />
          <Field
            name="productPrice"
            type="number"
            v-model.number="product.price"
            placeholder="Price"
          />
          <ErrorMessage name="productPrice" />
          <Field
            name="productDescription"
            type="text"
            v-model="product.description"
            placeholder="Description"
          />
          <ErrorMessage name="productDescription" />

          <select v-model="product.category">
            <option value="main dishes">Main Dishes</option>
            <option value="desserts">Desserts</option>
            <option value="salads">Salads</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>

        <input
          type="file"
          placeholder="Post product image"
          @change="handleProductImage"
        />

        <div class="button-container">
          <ButtonComponent btnStyle="default-button-green">{{
            saveButtonText
          }}</ButtonComponent>
          <ButtonComponent btnStyle="button-danger" @click="reset"
            >Cancel</ButtonComponent
          >
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductStore } from "@/store/productStore";
import ButtonComponent from "@/common-templates/ButtonComponent.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const store = useProductStore();
const product = ref(store.newProduct);
const show = computed(() => store.modalVisibility);

const modalTitle = computed(() =>
  store.isEditing ? "Edit Product" : "Add New Product"
);

const saveButtonText = computed(() => (store.isEditing ? "Save" : "Add"));

const productSchema = yup.object({
  productName: yup.string().required("A name is required!"),
  productPrice: yup
    .number()
    .min(1, "Price must be a positive number!")
    .required("This field is required!"),
  productDescription: yup.string().required("A description is required!"),
});

if (store.isEditing) {
  product.value = store.editedProduct;
} else {
  product.value = store.newProduct;
}

const saveClicked = () => {
  if (store.isEditing) {
    store.editProduct(product.value);
  } else {
    store.addProduct(product.value, product.value.imgSrc as File);
  }
  reset();
};

const reset = () => {
  store.resetNewProduct();
  store.isEditing = false;
  store.showAddModal = false;
  product.value = store.isEditing ? store.editedProduct : store.newProduct;
};

const handleProductImage = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    product.value.imgSrc = file;
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/_variables.scss";

span {
  color: red;
  margin: 0;
  padding: 0;
  font-size: 13px;
}

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
  height: 450px;
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
