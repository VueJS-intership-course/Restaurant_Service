import fireBaseData from "../firebaseConfig";
import { Menu } from "../menuServices/menuServices";

export class Orders {
    constructor(
        public status: 'pending' | 'done' | 'confirmed',
        public userId: string,
        public items: Menu[],
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}


function validateOrders(order: Orders) {
    if (!order.status) {
        throw new Error('Invalid order status!')
    }

    if (!order.items.length) {
        throw new Error('Invalid order items!')
    }

    if (!order.userId) {
        throw new Error('Invalid user id')
    }
}

// Order:
// {
//     id,
//         status,
//         userId,
//         items: [],
//             createdAt,
//             updatedAt,
// }