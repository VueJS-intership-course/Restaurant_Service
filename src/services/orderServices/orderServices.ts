import fireBaseData from "../firebaseConfig";
import { Menu } from "../menuServices/menuServices";
import { useOrderStore } from "../../store/orderStore.ts";
export class Orders {
  constructor(
    public status: "pending" | "done" | "confirmed",
    public items: Menu[],
    public createdAt: Date
  ) {}
}

function validateOrders(order: Orders) {
  if (!order.status) {
    throw new Error("Invalid order status!");
  }

  if (!order.items.length) {
    throw new Error("Invalid order items!");
  }
}

export default {
  async finishOrder() {
    try {
      const orderStore = useOrderStore();
      const order = new Orders("pending", orderStore.orderItems, new Date());

      validateOrders(order);

      console.log("Fire");
      await fireBaseData.fireStore.collection("orders").add(order);
    } catch (error) {
      console.error("Error placing the order:", error);
    }
  },
};
