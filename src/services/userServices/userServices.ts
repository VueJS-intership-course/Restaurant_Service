import fireBaseData from "../firebaseConfig";

class Employee {
    constructor(
        public username: string,
        public password: string,
        public name: string,
        public email: string,
        public role: string,
        public id?: string,
    ) { }
}

export default {
    async getAll() {
        try {
            const data: Employee[] = [];
            const querySnapshot = await fireBaseData.fireStore.collection('user-profiles').get();

            querySnapshot.forEach((doc: any) => {
                const { id, username, password, name, email, role } = doc.data();
                const user = new Employee(username, password, name, email, role, id);
                console.log(user);

                data.push(user);
            });

            return data;
        } catch (error) {
            console.error("Error fetching user profiles:", error);
            throw error;
        }
    },

    async signUp(user: Employee) {
        try {
            validateSchema(user)
            const userCredential = await fireBaseData.fireAuth.createUserWithEmailAndPassword(user.email, user.password);

            if (userCredential && userCredential.user) {
                await fireBaseData.fireStore.collection('user-profiles').doc(userCredential.user.uid).set({
                    username: user.username,
                    name: user.name,
                    role: user.role,
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


function validateSchema(user: Employee) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(user.email)) {
        throw new Error('Invalid email address');
    }

    if (user.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }

    if (!user.name.trim()) {
        throw new Error('Name cannot be empty');
    }

    const validRoles = ['employee', 'admin', 'manager'];
    if (!validRoles.includes(user.role)) {
        throw new Error('Invalid role');
    }

    if (!user.username.trim()) {
        throw new Error('Username cannot be empty');
    }
}
