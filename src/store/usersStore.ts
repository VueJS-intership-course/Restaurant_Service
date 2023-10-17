import { defineStore } from "pinia";
import userServices from "@/services/userServices/userServices";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Employee } from "@/services/classes";

interface User {
  name: string;
  phone: string;
}

export const usersStore = defineStore({
  id: "usersStore",
  state: () => ({
    userList: [] as Employee[],
    currentUser: {} as firebase.User | null,
    client: {} as User | null,
  }),

  getters: {
    isClientEmpty(state) {
      return state.client !== null;
    },
    getCurrentClient(state) {
      if (state.client !== null) return state.client;
    },
  },
  actions: {
    async getAllUsers() {
      this.userList = await userServices.getAll();
    },

    setCurrentUser(user: firebase.User | null) {
      this.currentUser = user;
    },

    getClientDataFromlocal() {
      const clientCreden = localStorage.getItem("user");
      if (clientCreden) {
        this.client = JSON.parse(clientCreden);
      }
    },

    clearClient() {
      localStorage.removeItem("user");
      this.client = null;
    },
  },
});
