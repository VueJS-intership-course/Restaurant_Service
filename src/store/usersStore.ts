import { defineStore } from "pinia";
import userServices from "../services/userServices/userServices";
import { Employee } from "../services/userServices/userServices";

export const usersStore = defineStore({
  id: "usersStore",
  state: () => ({
    userList: [] as Employee[],
    currentUser: {}
  }),
  actions: {
    async getAllUsers() {
      this.userList = await userServices.getAll();
    },

    setCurrentUser(user: any) {
      this.currentUser = user
      console.log(this.currentUser);
    }

  },
});
