import fireBaseData from "../firebaseConfig";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";

export class Employee {
  constructor(
    public username: string,
    public email: string,
    public role: "employee" | "admin" | "manager",
    public id?: string,
    public password?: string
  ) {}
}

export default {
  async getAll() {
    try {
      const data: Employee[] = [];
      const querySnapshot = await fireBaseData.fireStore.collection("user-profiles").get();

            querySnapshot.forEach((doc) => {
                const { username, email, role } = doc.data();

                const id = doc.id;

                const user = new Employee(username, email, role, id);
                console.log(user);

        const user = new Employee(username, email, role, id);

        data.push(user);
      });

    async signUp(user: Employee, password: string) {
        try {
            validateSchema(user, password)
            const userCredential = await fireBaseData.fireAuth.createUserWithEmailAndPassword(user.email, password);

  async signUp(user: Employee, password) {
    try {
      validateSchema(user, password);
      const userCredential = await fireBaseData.fireAuth.createUserWithEmailAndPassword(
        user.email,
        password
      );

      if (userCredential && userCredential.user) {
        await fireBaseData.fireStore
          .collection("user-profiles")
          .doc(userCredential.user.uid)
          .set({
            email: user.email,
            username: user.username,
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
            const auth = getAuth();
            setPersistence(auth, browserLocalPersistence)
                .then(() => {
                    return signInWithEmailAndPassword(auth, email, password);
                })
                .catch((err) => {
                    throw err.message;
                })

        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
    },


    async logout() {
        await fireBaseData.fireAuth.signOut()
        localStorage.clear()
    }
};


function validateSchema(user: Employee, password: string) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(user.email)) {
        throw new Error('Invalid email address');
    }

  if (password.length < 8 || !password) {
    throw new Error("Password must be at least 8 characters long");
  }

  if (!user.role) {
    throw new Error("Invalid role choice");
  }

  if (!user.username || !user.username.trim()) {
    throw new Error("Username cannot be empty");
  }
}



