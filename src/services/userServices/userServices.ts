import fireBaseData from "../firebaseConfig";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  getAuth,
} from "firebase/auth";
import { Employee } from "../classes";

export default {
  async getAll() {
    try {
      const data: Employee[] = [];
      const querySnapshot = await fireBaseData.fireStore.collection("user-profiles").get();

      querySnapshot.forEach((doc: any) => {
        const { username, email } = doc.data();

        const id = doc.id;

        const user = new Employee(username, email, id);

        data.push(user);
      });

      return data;
    } catch (error) {
      console.error("Error fetching user profiles:", error);
      throw error;
    }
  },

  async signUp(user: Employee, password: string) {
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
        });
    } catch (error) {
      throw new Error('Invalid email or password')
    }
  },

  async logout() {
    await fireBaseData.fireAuth.signOut()
  }

};

function validateSchema(user: Employee, password: string) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(user.email)) {
    throw new Error("Invalid email address");
  }

  if (password.length < 8 || !password) {
    throw new Error("Password must be at least 8 characters long");
  }

  if (!user.username || !user.username.trim()) {
    throw new Error("Username cannot be empty");
  }
}
