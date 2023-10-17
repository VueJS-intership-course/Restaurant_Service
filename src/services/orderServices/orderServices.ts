import fireBaseData from "@/services/firebaseConfig";
import { Orders } from "@/services/classes";

function validateOrders(order: Orders) {
  if (!order.status) {
    throw new Error("Invalid order status!");
  }

  if (!order.items.length) {
    throw new Error("Invalid order items!");
  }
}

export default {
  async finishOrder(order: Orders) {
    try {
      validateOrders(order);

      await fireBaseData.fireStore.collection("orders").doc().set(order);
    } catch (error) {
      console.error("Error placing the order:", error);
    }
  },
};
