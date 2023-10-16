import { defineStore } from 'pinia';
import { Menu } from '../services/menuServices/menuServices';
import orderServices from '../services/orderServices/orderServices';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orderItems: [] as Menu[],
  }),
  getters: {
    uniqueOrders: (state) => {
      const groupedOrders = new Map();
      for (const order of state.orderItems) {
        if (groupedOrders.has(order.id)) {
          const existingOrder = groupedOrders.get(order.id);
          existingOrder.count++;
        } else {
          groupedOrders.set(order.id, { ...order, count: 1 });
        }
      }
      console.log(Array.from(groupedOrders.values()));

      return Array.from(groupedOrders.values());
    },
  },
  actions: {
    addToOrder(dish: Menu) {
      this.orderItems.push(dish);
      this.saveOrderToLocalStorage();
    },
    removeFromOrder(index: number) {
      this.orderItems.splice(index, 1);
      // this.orderItems = this.orderItems.filter((_, i) => i !== index);
      this.saveOrderToLocalStorage();
    },
    clearOrder() {
      this.orderItems = [];
      localStorage.removeItem('orderData');
    },
    handleFinishOrder(order: any) {
      orderServices.finishOrder(order);
      this.orderItems = [];
      localStorage.removeItem('orderData');
    },
    loadOrderFromLocalStorage() {
      const orderData = localStorage.getItem('orderData');
      if (orderData) {
        this.orderItems = JSON.parse(orderData);
      }
    },
    saveOrderToLocalStorage() {
      localStorage.setItem('orderData', JSON.stringify(this.orderItems));
    },
  },
});
