import fireBaseData from "../firebaseConfig";

export default {
  getAll() {
    fireBaseData.fireStore
      .collection("user-profiles")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
        });
      });
  },

  signUp(email: string, password: string) {
    fireBaseData.fireAuth.createUserWithEmailAndPassword(email, password);
  },
};
