import { defineStore } from "pinia";
import { Menu } from "@/services/classes";
import orderServices from "@/services/orderServices/orderServices";

export const useCartStore = defineStore("orders", {
  state: () => ({
    cartItems: [] as Menu[],
    orderItems: []
  }),
  getters: {
    uniqueOrders: (state) => {
      
      const groupedOrders = state.cartItems.reduce((acc, order) => {
        if (acc.has(order.id)) {
          const existingOrder = acc.get(order.id);
          existingOrder.count++;
        } else {
          acc.set(order.id, { ...order, count: 1 })
        }
        return acc;
      }, new Map())

      console.log(Array.from(groupedOrders.values()));

      return Array.from(groupedOrders.values()).sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  actions: {
    addToCart(dish: Menu) {
      this.cartItems.push(dish);
      this.saveOrderToLocalStorage();
    },
    removeFromCart(index: number) {
      this.cartItems.splice(index, 1);
      console.log(this.cartItems);

      this.saveOrderToLocalStorage();
    },
    clearCart() {
      this.cartItems = [];
      localStorage.removeItem("orderData");
    },
    handleFinishOrder(order: any) {
      orderServices.finishOrder(order);
      this.cartItems = [];
      localStorage.removeItem("orderData");
    },
    loadOrderFromLocalStorage() {
      const orderData = localStorage.getItem("orderData");
      if (orderData) {
        this.cartItems = JSON.parse(orderData);
      }
    },
    saveOrderToLocalStorage() {
      localStorage.setItem("orderData", JSON.stringify(this.cartItems));
    },
    loadClientOrderFromLocalStorage() {
      const clientOrder = localStorage.getItem('orderData');
      if (clientOrder) {
        this.orderItems = JSON.parse(clientOrder);
      }
    }
  },
});

