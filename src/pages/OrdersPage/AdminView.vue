<template>
  <div class="orders-container">
    <h1 class="title">Orders</h1>
    <div v-if="isEmptyOrders" class="empty-orders">No orders placed!</div>
    <div v-if="!isEmptyOrders" v-for="order in ordersList" :key="order.clientId" class="order-card">
      <div class="order-details">
        <div class="order-info">
          <div class="client">Client: {{ order.clientId }}</div>
          <div class="created-at">Created at: {{ formatTimestamp(order.createdAt) }}</div>
        </div>
        <ul class="item-list">
          <span>Products:</span>
          <li v-for="item in order.items" :key="item.id">{{ item.name }}</li>
        </ul>
        <div class="order-status">
          <div>Status: <span :class="statusColor(order.status)">{{ order.status }}</span></div>
          <div>
            <ButtonComponent @click="handleConfirmOrder(order)" style="background-color: #266488">Confirm</ButtonComponent>
            <ButtonComponent @click="handleDeliveredOrder(order)" style="background-color: green">Delivered</ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../../store/orderStore.ts';
import ButtonComponent from '@/common-templates/ButtonComponent.vue';

const cartStore = useCartStore();
cartStore.loadClientOrder();

const handleConfirmOrder = (order: any) => {
  cartStore.confirmOrder(order);
}

const handleDeliveredOrder = (order: any) => {
  cartStore.deliverOrder(order);
}

const formatTimestamp = (timestamp: any): string => {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString();
};

const statusColor = (status: any) => {
  if (status === 'pending') {
    return 'status-pending';
  } else if (status === 'confirmed') {
    return 'status-confirmed';
  } else if (status === 'delivered') {
    return 'status-delivered';
  }
}

const ordersList = computed(() => cartStore.orderItems);
const isEmptyOrders = computed(() => ordersList.value.length === 0);
</script>

<style scoped lang="scss">
.orders-container {
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .empty-orders {
    font-size: 20px;
    color: #555;
  }
  .order-card {
    width: 100%;
    background-color: #f7cf64;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
    .order-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
  
      .order-info {
        .client {
          font-weight: bold;
        }
  
        .created-at {
          color: #777;
        }
      }
  
      .item-list {
        list-style: none;
        margin: 0;
        padding: 0;
        span {
          font-weight: bold;
        }
        li {
          margin-left: 20px;
          color: #333;
        }
      }
  
      .order-status {
        display: flex;
        flex-direction: column;
        .status-pending {
          color: red;
          font-weight: bold;
        }

        .status-confirmed {
          color: #266488;
          font-weight: bold;
        }

        .status-delivered {
          color: green;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
