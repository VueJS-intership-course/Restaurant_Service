import fireBaseData from "../firebaseConfig";

interface Emplyee {
    id: string,
    username: string,
    password: string
    name: string,
    email: string,
    role: string,
}

export default {
    async getAll() {
        try {
            const data: Emplyee[] = [];
            const querySnapshot = await fireBaseData.fireStore.collection('user-profiles').get();

            querySnapshot.forEach(doc => {
                data.push(doc.data() as Emplyee);
            });

            return data;
        } catch (error) {
            console.error("Error fetching user profiles:", error);
            throw error;
        }
    },

    async signUp(email: string, password: string, username: string, name: string, role: string) {
        try {
            const userCredential = await fireBaseData.fireAuth.createUserWithEmailAndPassword(email, password);

            if (userCredential && userCredential.user) {
                await fireBaseData.fireStore.collection('user-profiles').doc(userCredential.user.uid).set({
                    username,
                    name,
                    role,
                });
            }
        } catch (error) {
            console.error("Error signing up:", error);
            throw error;
        }
    },


    async signIn(email: string, password: string) {
        try {
            await fireBaseData.fireAuth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
    },
};
