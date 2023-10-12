import { defineStore } from "pinia";
import menuServices from "../services/menuServices/menuServices";
import { Menu } from "../services/menuServices/menuServices";

export const useProductStore = defineStore({
  id: "productStore",
  state: () => ({
    products: [] as Menu[],
  }),


  actions: {
    async getProductList() {
      this.products = await menuServices.getAll();
    },

    async addProduct(product: Menu) {
      await menuServices.addProduct(product);
      this.getProductList();
    },

    async removeProduct(product: Menu) {
      await menuServices.deleteProduct(product);
      this.getProductList();
    },

    async editProduct(product: Menu) {
      await menuServices.editProduct(product);
      this.getProductList();
    },
  },
});
