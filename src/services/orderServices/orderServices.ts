class Orders {
    constructor(
        public status: 'pending' | 'done' | 'confirmed',
        public userId: string,
        public items: string[],
        public createdAt: Date,
        public updatedAt: Date
    ) { }
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
