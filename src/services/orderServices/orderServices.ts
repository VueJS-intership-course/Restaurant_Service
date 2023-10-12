import fireBaseData from '../firebaseConfig';
import { Menu } from '../menuServices/menuServices';
import {useOrderStore} from '../../store/orderStore.ts';

export class Orders {
  constructor(
    public status: 'pending' | 'done' | 'confirmed',
    public items: Menu[],
    public createdAt: Date,
  ) {}

  // toObject() {
  //   return {
  //     status: this.status,
  //     items: this.items.map(item => item.toObject()),
  //     createdAt: this.createdAt.toISOString(),
  //   };
  // }
}

function validateOrders(order: Orders) {
  if (!order.status) {
    throw new Error('Invalid order status!');
  }

  if (!order.items.length) {
    throw new Error('Invalid order items!');
  }
}

export default {
  async finishOrder(order) {
    try {
      // const order = new Orders(
      //   'pending',
      //   orderStore.orderItems,
      //   new Date(),
      // );
      // const order = new Orders('pending', orderStore.orderItems, new Date());
      
      validateOrders(order);

      // const orderData = order.toObject();
      console.log(order);
      // await fireBaseData.fireStore.collection('orders').addDoc(order);
      await fireBaseData.fireStore.collection('orders').doc().set(order);
  
    } catch (error) {
      console.error('Error placing the order:', error);
    }
  },
};