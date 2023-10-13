import { defineStore } from "pinia";
import userServices from "../services/userServices/userServices";
import firebase from "firebase/compat/app"; 
import "firebase/compat/auth"; 
import { Employee } from "../services/userServices/userServices";

export const usersStore = defineStore({
  id: "usersStore",
  state: () => ({
    userList: [] as Employee[],
    currentUser: {} as firebase.User | null,
  }),
  actions: {
    async getAllUsers() {
      this.userList = await userServices.getAll();
    },

    setCurrentUser(user: firebase.User | null) {
      this.currentUser = user;
    },
  },
});
