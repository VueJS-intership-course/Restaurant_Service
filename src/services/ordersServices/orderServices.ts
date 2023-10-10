import firebaseData from "../firebaseConfig";

interface Order {
    id: string;
    status: string;
    userId: string,
    items: [],
    createdAt: Date,
    updatedAt: Date,
}


export default {
    async getAllOrders() {
        try {
            const data: Order[] = [];
            const querySnapshot = await firebaseData.fireStore.collection('user-profiles').get();

            querySnapshot.forEach(doc => {
                data.push(doc.data() as Order);
            });

            return data;
        } catch (error) {
            console.error("Error fetching user profiles:", error);
            throw error;
        }
    },

    async setOrder(order: Order) {
        try {
            firebaseData.fireStore.collection('cart').doc().set(order)
        } catch(err) {
            throw err
        }
    },
}