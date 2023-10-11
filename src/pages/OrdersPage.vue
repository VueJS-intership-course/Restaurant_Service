<template>
  <div class="order-page">
    <div class="orders">
      <h1>Orders</h1>
      <div v-for="order in orderStore.orderItems" class="meal-container">
        <span>Meal: {{ order.name }}</span>
        <span>Price: {{ order.price }}</span>
      </div>
    </div>
    <div class="total">
      <h1>Total</h1>
      <div>
        <span>Sum: {{ calculateTotalSum() }}</span>
        <button>Order</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useOrderStore} from '../store/orderStore.ts';

const orderStore = useOrderStore();

const calculateTotalSum = (): number => {
  let total: number = 0;

  for (const order of orderStore.orderItems) {
    total += order.price 
  }
  return total;
}
</script>

<style scoped lang="scss">
.order-page {
  display: flex;
  flex-direction: row;
  gap: 79px;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  .orders {
    background-color: #f7cf64;
    padding: 20px;
    width: 72%;
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

      span {
        font-size: 20px;
        color: black;
      }
    }
  }
}

.total {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
  background-color: #d44435;
  color: black;
  padding: 20px;
  border-radius: 10px;

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    button {
      width: 100px;
      background-color: red;
      color: black;
      font-weight: bold;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
    }
  }

}
</style>
