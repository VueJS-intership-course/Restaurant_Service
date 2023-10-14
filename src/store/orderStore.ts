import { defineStore } from "pinia";
import { Menu } from "../services/menuServices/menuServices";
import orderServices from "../services/orderServices/orderServices";

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orderItems: [] as Menu[],
  }),
  actions: {
    addToOrder(dish: Menu) {
      this.orderItems.push(dish);
      console.log(this.orderItems);
      this.saveOrderToLocalStorage();
    },
    removeFromOrder(index: number) {
      this.orderItems.splice(index, 1);
      this.saveOrderToLocalStorage();
    },
    clearOrder() {
      this.orderItems = [];
      localStorage.removeItem('orderData')
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