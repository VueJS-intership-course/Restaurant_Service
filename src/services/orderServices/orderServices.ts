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
  async finishOrder(order: Orders): Promise<void> {
    try {
      validateOrders(order);
      await fireBaseData.fireStore.collection("orders").doc(order.orderId).set(order);
    } catch (error) {
      console.error("Error placing the order:", error);
    }
  },
  async getOrder(): Promise<Orders[]> {
    try {

      const querySnapshot = await fireBaseData.fireStore.collection('orders').get();

      const orders: Orders[] = [];

      querySnapshot.forEach((doc) => {
        const {status, items, createdAt, clientId, orderId} = doc.data();
        const order = new Orders(status, items, createdAt, clientId, orderId);
        orders.push(order);
      });
      
      return orders;
    } catch (error) {
      console.error('Error fetching order: ' + error);
      return [];
    }
  },
  async updateOrderStatus(order: Orders) {
    const doc = await fireBaseData.fireStore
      .collection("orders")
      .doc(order.orderId)
      .get();

    try {
      await doc.ref.update({
        status: order.status
      });
    } catch (error) {
      console.error("Error editing item: ", error);
    }
  },
};
