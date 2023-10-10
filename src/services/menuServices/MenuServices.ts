import firebaseData from "../firebaseConfig";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

interface MenuItem {
    id: string;
    name: string;
    price: number;
    description: string;
};

type PriceFilterType = 'exact' | 'less' | 'greater';
type OrderType = 'asc' | 'desc';

export default {
    async getAllMenuItmes() {
        try {
            let data: MenuItem[] = []
            const querySnapshot = await firebaseData.fireStore.collection('menu').get();

            querySnapshot.forEach(doc => {
                data.push(doc.data() as MenuItem)
            })
        } catch (error) {
            throw error
        }
    },


    async filterByName(orderType: OrderType) {
        try {
            let query = firebaseData.fireStore.collection('menu').orderBy('name', orderType);

            const querySnapshot = await query.get();
            let filteredItems: MenuItem[] = [];

            querySnapshot.forEach(doc => {
                filteredItems.push(doc.data() as MenuItem);
            });

            return filteredItems;

        } catch (error) {
            throw error
        }
    },


    async filterByPrice(priceBy: PriceFilterType, pricingNum: number) {
        try {
            const collectionRef = firebaseData.fireStore.collection('menu');

            let query: firebase.firestore.Query<firebase.firestore.DocumentData> = collectionRef;

            if (priceBy === 'greater') {
                query = query.where('price', '>', pricingNum);
            } else if (priceBy === 'less') {
                query = query.where('price', '<', pricingNum);
            } else if (priceBy === 'exact') {
                query = query.where('price', '==', pricingNum);
            }

            const querySnapshot = await query.get();
            let filteredItems: MenuItem[] = [];

            querySnapshot.forEach(doc => {
                filteredItems.push(doc.data() as MenuItem);
            });

            return filteredItems;

        } catch (error) {
            throw error;
        }
    },

    async filterByDescription(orderType: OrderType) {
        try {
            let query = firebaseData.fireStore.collection('menu').orderBy('name', orderType);

            const querySnapshot = await query.get();
            let filteredItems: MenuItem[] = [];

            querySnapshot.forEach(doc => {
                filteredItems.push(doc.data() as MenuItem);
            });

            return filteredItems;

        } catch (error) {
            throw error
        }
    }
}