<template>
  <div class="cart-container">
    <h1>Orders</h1>
    <div v-if="orderList.length === 0" class="empty-orders">
      No orders placed!
    </div>
    <div v-if="orderList.length > 0" v-for="order in orderList" :key="order.clientId" class="meal-container">
    <div v-if="ordersList.length === 0" class="empty-orders">No orders placed!</div>
    <div
      v-if="ordersList.length > 0"
      v-for="order in ordersList"
      :key="order.clientId"
      class="meal-container"
    >
      <div class="cart-item">
        <span>Client: {{ order.clientId }}</span>
        <span>Order items: {{ order.items.length }} </span>
        <span>Created at: {{ order.createdAt }} </span>
        <span>Status of order: {{ order.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "../../store/orderStore.ts";

const cartStore = useCartStore();

const orderList = computed(() => cartStore.orderItems);
cartStore.loadClientOrder();


const ordersList = computed(() => cartStore.orderItems);

const orderItems = cartStore.orderItems;
console.log(orderItems);
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
