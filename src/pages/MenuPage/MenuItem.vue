<template>
  <div class="product-item">
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <p>Category: {{ product.category }}</p>
    <p class="price">Price: ${{ product.price }}</p>

    <ButtonComponent @click="addToCartClicked(product)" v-if="!store.isAdmin"
      >Add to Cart</ButtonComponent
    >
    <ButtonComponent
      btnStyle="default-button-db"
      @click="editProductClicked"
      v-if="store.isAdmin"
      >Edit</ButtonComponent
    >
    <ButtonComponent
      btnStyle="button-danger"
      @click="deleteProductClicked"
      v-if="store.isAdmin"
      >Delete</ButtonComponent
    >
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/orderStore.ts";
import { Menu } from "@/services/classes";
import showNotification from "@/utils/notifications";
import ButtonComponent from "@/common-templates/ButtonComponent.vue";


const { product } = defineProps(["product"]);

const store = useProductStore();
const cartStore = useCartStore();

const addToCartClicked = (product: Menu) => {
  cartStore.addToCart(product);
  showNotification(`${product.name} has been added to the cart.`);
};

const editProductClicked = () => {
  store.isEditing = true;
  store.editedProductId = product.id;
  store.editedProduct = { ...product };
};

const deleteProductClicked = () => {
  store.removeProduct(product);
  showNotification(`${product.name} has been deleted.`);
};
</script>

<style scoped lang="scss">
@import "../../styles/_variables.scss";

.product-item {
  margin: 5px 30px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
}

.product-item {
  color: $dark-blue;
}

.price {
  font-weight: bold;
  color: $red;
  align-self: right;
}
</style>
