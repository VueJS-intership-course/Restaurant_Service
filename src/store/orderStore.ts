import { defineStore } from "pinia";
import { Menu, Orders } from "@/services/classes";
import orderServices from "@/services/orderServices/orderServices";

export const useCartStore = defineStore("orders", {
  state: () => ({
    cartItems: [] as Menu[],
    orderItems: [] as Orders[]
  }),
  getters: {
    uniqueOrders: (state) => {
      const groupedOrders = state.cartItems.reduce((acc, order) => {
        if (acc.has(order.id)) {
          const existingOrder = acc.get(order.id);
          existingOrder.count++;
        } else {
          acc.set(order.id, { ...order, count: 1 });
        }
        return acc;
      }, new Map());

      console.log(Array.from(groupedOrders.values()).sort((a, b) => a.name.localeCompare(b.name)));
      
      return Array.from(groupedOrders.values()).sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  actions: {
    addToCart(dish: Menu) {
      this.cartItems.push(dish);
      console.log(dish);
      
      this.saveOrderToLocalStorage();
    },
    removeFromCart(index: number) {
      this.cartItems.splice(index, 1);
      this.saveOrderToLocalStorage();
    },
    clearCart() {
      this.cartItems = [];
      localStorage.removeItem("orderData");
    },
    async handleFinishOrder(order: any) {
      await orderServices.finishOrder(order);
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
    async loadClientOrder() {
      const clientOrder = await orderServices.getOrder();
      console.log(clientOrder);
      
      if (clientOrder) {
        this.orderItems = clientOrder;
      }
    },
    async confirmOrder(order: Orders) {
      order.status = "confirmed";
      await orderServices.updateOrderStatus(order);
    },
    async deliverOrder(order: Orders) {
      order.status = "delivered";
      await orderServices.updateOrderStatus(order);
    }
  },
});
