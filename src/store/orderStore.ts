import { defineStore } from "pinia";

export const useOrderStore = defineStore({
  id: "orderStore",
  state: () => ({
    cart: [],
  }),
});
