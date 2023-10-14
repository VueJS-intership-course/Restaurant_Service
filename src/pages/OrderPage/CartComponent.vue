<template>
    <div class="cart-container">
      <h1>Cart</h1>
      <div v-if="orderStore.uniqueOrders.length === 0" class="meal-container">
        <span>Your cart is empty</span>
      </div>
      <div v-else v-for="order in orderStore.uniqueOrders" :key="order.id" class="meal-container">
        <span class="notification">{{ mealCounter(order.id) }}</span>
        <span>Meal: {{ order.name }}</span>
        <span>Price: {{ order.price * order.count }}$</span>
        <span>({{ order.price }}$ x {{ order.count }})</span>
        <ButtonComponent btn-style="button-danger" @click="handleRemoveMeal(order.id)"
          style="width: 100px; align-self: center">Remove</ButtonComponent>
      </div>
    </div>
</template>

<script setup lang="ts">
import {useOrderStore} from '../../store/orderStore.ts';
import ButtonComponent from '../../common-templates/ButtonComponent.vue';

const orderStore = useOrderStore();

const mealCounter = (mealId: string) => {
  const count = orderStore.orderItems.filter(
    (order) => order.id === mealId
  ).length;
  return count;
};

const handleRemoveMeal = (mealId: string) => {
  const index = orderStore.orderItems.findIndex((order) => order.id === mealId);
  if (index !== -1) {
    orderStore.removeFromOrder(index);
  }
};
</script>

<style lang="scss">
.cart-container {
    background-color: #f7cf64;
    padding: 20px;
    width: 72%;
    min-height: 100px;
    border-radius: 10px;

    h1 {
      color: black;
    }

    .meal-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 25px;
      margin-top: 10px;
      background-color: rgb(167, 134, 3);
      padding: 50px;
      margin-bottom: 10px;
      border-radius: 5px;

      .notification {
        display: flex;
        align-self: end;
        font-size: 16px;
        color: #fff;
        background-color: #266488;
        width: 10px;
        padding: 5px 10px;
        border-radius: 10px;
      }

      span {
        font-size: 20px;
        color: black;
      }
    }
  }
  </style>