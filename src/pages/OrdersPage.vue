<template>
  <div class="cart-page">
    <div class="cart-container">
      <h1>Cart</h1>
      <div v-if="uniqueOrders.length === 0" class="meal-container">
        <span>Your cart is empty</span>
      </div>
      <div v-else v-for="order in uniqueOrders" :key="order.id" class="meal-container">
        <span class="notification">{{ mealCounter(order.id) }}</span>
        <span>Meal: {{ order.name }}</span>
        <span>Price: {{ order.price * order.count }}$</span>
        <span>({{ order.price }}$ x {{ order.count }})</span>
        <ButtonComponent btn-style="button-danger" @click="handleRemoveMeal(order.id)"
          style="width: 100px; align-self: center">Remove</ButtonComponent>
      </div>
    </div>
    <div class="total">
      <h1>Total</h1>
      <div>
        <span v-if="calculateTotalSum() === 0">Choose meal</span>
        <span v-else>Sum: {{ calculateTotalSum() }}$</span>
        <div class="buttons">
          <button @click="handleClearOrder">Clear cart</button>
          <button @click="makeOrder">Order!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useOrderStore } from '../store/orderStore.ts';
import ButtonComponent from '../common-templates/ButtonComponent.vue';

const orderStore = useOrderStore();

const calculateTotalSum = (): number => {
  let total: number = 0;

  for (const order of orderStore.orderItems) {
    total += order.price;
  }
  return total;
};

const handleRemoveMeal = (mealId: string) => {
  const index = orderStore.orderItems.findIndex((order) => order.id === mealId);
  if (index !== -1) {
    orderStore.removeFromOrder(index);
  }
};

const handleClearOrder = () => {
  orderStore.clearOrder();
};

const mealCounter = (mealId: string) => {
  const count = orderStore.orderItems.filter(
    (order) => order.id === mealId
  ).length;
  return count;
};

const uniqueOrders = computed(() => {
  const groupedOrders = new Map();
  for (const order of orderStore.orderItems) {
    if (groupedOrders.has(order.id)) {
      const existingOrder = groupedOrders.get(order.id);
      existingOrder.count++;
    } else {
      groupedOrders.set(order.id, { ...order, count: 1 });
    }
  }

  return Array.from(groupedOrders.values());
});

// const plural = (orderName: string) => {
//   if (orderName.endsWith('s')) {
//     return 'es';
//   } else if (orderName.endsWith('y')) {
//     return `${orderName.slice(0, -1)}ies`;
//   } else {
//     return 's';
//   }
// };

const makeOrder = () => {
  const possibleStatus = ['pending', 'done', 'confirmed'];
  const randomIndex = Math.floor(Math.random() * possibleStatus.length);
  const randomStatus = possibleStatus[randomIndex];

  const order = {
    status: randomStatus,
    items: uniqueOrders.value,
    createdAt: new Date(),
  };

  orderStore.handleFinishOrder(order);
};
</script>

<style scoped lang="scss">
.cart-page {
  background-color: #79e59b;
  min-height: 598px;
  display: flex;
  flex-direction: row;
  gap: 79px;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;

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

  .total {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 22%;
    height: 200px;
    background-color: #266488;
    color: black;
    padding: 20px;
    border-radius: 10px;

    div {
      display: flex;
      flex-direction: column;
      gap: 10px;

      span {
        font-size: 18px;
      }

      .buttons {
        display: flex;
        flex-direction: row;

        button {
          width: 100px;
          background-color: #d44435;
          color: black;
          font-weight: bold;
          font-size: 18px;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
