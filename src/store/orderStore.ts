import { defineStore } from "pinia";
import { Menu } from "../services/menuServices/menuServices";
import orderServices from "../services/orderServices/orderServices";

export const useOrderStore = defineStore({
  id: "orders",
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
    handleFinishOrder(order) {
      console.log('handleFinish');
      // console.log(order);
      
      orderServices.finishOrder(order);
    }
  },
});
