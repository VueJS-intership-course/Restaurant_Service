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
import { useCartStore } from '../../store/orderStore.ts';
import { usersStore } from '@/store/usersStore.ts';
import fireBaseData from "@/services/firebaseConfig";

const cartStore = useCartStore();
const userStore = usersStore();

const calculateTotalSum = computed((): number => {
  let total: number = 0;

  for (const order of cartStore.cartItems) {
    if (typeof order.price === 'number') {
      total = total + order.price;
    }
  }
  return total;
});

const handleClearOrder = () => {
  cartStore.clearCart();
};

const makeOrder = () => {

  const user = userStore.client;

  const order = {
    status: 'pending',
    items: cartStore.uniqueOrders,
    createdAt: new Date(),
    clientId: user?.phone,
    orderId: fireBaseData.fireStore.collection("orders").doc().id
  };

  localStorage.removeItem('user');
  cartStore.handleFinishOrder(order);
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