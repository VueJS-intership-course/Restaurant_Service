import fireBaseData from '../firebaseConfig';
import { Menu } from '../menuServices/menuServices';
import {useOrderStore} from '../../store/orderStore.ts';
const orderStore = useOrderStore();

export class Orders {
  constructor(
    public status: 'pending' | 'done' | 'confirmed',
    // public userId: string,
    public items: Menu[],
    public createdAt: Date,
    // public updatedAt: Date
  ) {}
}

function validateOrders(order: Orders) {
  if (!order.status) {
    throw new Error('Invalid order status!');
  }

  if (!order.items.length) {
    throw new Error('Invalid order items!');
  }

  // if (!order.userId) {
  //   throw new Error('Invalid user id');
  // }
}

export default {
  async finishOrder() {
    try {
      const plainItems = orderStore.orderItems.map(item => {
        return {
          name: item.name,
          price: item.price,
        };
      });

      const order = new Orders(
        'pending',
        plainItems,
        new Date()
      );
      // const order = new Orders(
      //   'pending',
      //   // 'user_id_here',
      //   orderStore.orderItems,
      //   new Date(),
      // );
      
      validateOrders(order);

      console.log('Fire');
      await fireBaseData.fireStore.collection('orders').add(order);
  
    } catch (error) {
      console.error('Error placing the order:', error);
    }
  },
};
