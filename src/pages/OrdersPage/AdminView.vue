<template>
  <div class="cart-container">
    <h1>Orders</h1>
    <div v-if="cartStore.orderItems.length === 0" class="empty-orders">
      No orders placed!
    </div>
    <div v-if="cartStore.orderItems.length > 0" v-for="order in cartStore.orderItems" class="meal-container">
      <div class="cart-item">
        <span>Client: {{ order.name }}</span>
        <span>Order: {{ order.id }} </span>
        <span>Created at: {{ order.price }} </span>
        <span>Status of order: {{ order.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../../store/orderStore.ts';

const cartStore = useCartStore();
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

    .cart-item {
      display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          width: 350px;
          height: 50px;
    }

  }
}
</style>
