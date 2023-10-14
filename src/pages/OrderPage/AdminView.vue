<template>
    <div class="cart-container">
      <h1>Orders</h1>
      <div v-if="orderStore.uniqueOrders.length === 0" class="meal-container">
        <span>No orders placed!</span>
      </div>
      <div class="meal-container">
        <span>Client: </span>
        <span>Order: </span>
        <span>Created at: </span>
        <span>Status of order: </span>
      </div>
    </div>
</template>

<script setup lang="ts">
import {useOrderStore} from '../../store/orderStore.ts'

const orderStore = useOrderStore();
</script>