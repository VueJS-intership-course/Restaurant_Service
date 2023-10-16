<template>
  <div class="cart-container">
    <h1>Orders</h1>
    <div v-if="orderStore.uniqueOrders.length === 0" class="empty-orders">
      No orders placed!
    </div>
    <div v-if="orderStore.uniqueOrders.length > 0" class="meal-container">
      <span>Client: </span>
      <span>Order: </span>
      <span>Created at: </span>
      <span>Status of order: </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '../../store/orderStore.ts';

const orderStore = useOrderStore();
</script>

<style lang="scss">
.cart-container {
  padding: 20px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty-orders {
    font-size: 24px;
      color: #555;
  }

  .meal-container {
    width: 100%;
    max-width: 400px;
    background-color: #f7cf64;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}
</style>
