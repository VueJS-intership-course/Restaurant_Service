import { defineStore } from 'pinia';
import { Menu } from '../services/menuServices/menuServices';

export const useOrderStore = defineStore('order', {
  state: () => ({
    orderItems: [] as Menu[], 
  }),
  actions: {
    addToOrder(dish: Menu) {
      this.orderItems.push(dish);
      console.log(this.orderItems);
    },
    removeFromOrder(index: number) {
      this.orderItems.splice(index, 1);
    },
    clearOrder() {
      this.orderItems = [];
    },
  },
});