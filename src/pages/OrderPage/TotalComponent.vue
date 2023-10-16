<template>
    <div class="total">
      <h1>Total</h1>
      <div>
        <span v-if="calculateTotalSum === 0">
          <RouterLink :to="'/menu'" style="color: red;">
            Choose meal
          </RouterLink>
        </span>
        <span v-else>Sum: {{ calculateTotalSum }}$</span>
        <div class="buttons">
          <button @click="handleClearOrder">Clear cart</button>
          <button @click="makeOrder">Order!</button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useOrderStore } from '../../store/orderStore';

const orderStore = useOrderStore();

const calculateTotalSum = computed((): number => {
  let total: number = 0;

  for (const order of orderStore.orderItems) {
    if (typeof order.price === 'number') {
      total = total + order.price;
    }
  }
  return total;
});

const handleClearOrder = () => {
  orderStore.clearOrder();
};

const makeOrder = () => {
  const possibleStatus = ['pending', 'done', 'confirmed'];
  const randomIndex = Math.floor(Math.random() * possibleStatus.length);
  const randomStatus = possibleStatus[randomIndex];

  const order = {
    status: randomStatus,
    items: orderStore.uniqueOrders,
    createdAt: new Date(),
  };

  localStorage.removeItem('user');
  orderStore.handleFinishOrder(order);
};
</script>

<style lang="scss">
.total {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid #075f37;
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
</style>