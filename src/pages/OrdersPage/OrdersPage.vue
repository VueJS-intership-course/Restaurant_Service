<template>
  <div v-if="isAdmin" class="cart-page">
    <AdminView />
  </div>
  <div v-else class="cart-page">
    <CartComponent />
    <TotalComponent class="total" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../../store/orderStore.ts';
import { usersStore } from '../../store/usersStore';
import CartComponent from './CartComponent.vue';
import AdminView from './AdminView.vue';
import TotalComponent from './TotalComponent.vue';

const cartStore = useCartStore();
const userStore = usersStore();

const isAdmin = computed(() => userStore.currentUser);

const orderData = localStorage.getItem('orderData');
if (orderData) {
  cartStore.loadOrderFromLocalStorage();
}

cartStore.loadClientOrder();
</script>

<style scoped lang="scss">
.cart-page {
  background-color: #79e59b;
  min-height: calc(100vh - 9rem);
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 100px;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;

  .total {
    align-self: center;
  }
}
</style>
