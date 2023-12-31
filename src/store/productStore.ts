import { defineStore } from "pinia";
import menuServices from "@/services/menuServices/menuServices.ts";
import { usersStore } from "@/store/usersStore.ts";
import { Menu } from "@/services/classes.ts";

export const useProductStore = defineStore({
  id: "productStore",
  state: () => ({
    products: [] as Menu[],
    selectedCategory: "all",
    searchQuery: "",
    isEditing: false,
    editedProductId: "",
    editedProduct: {
      id: "",
      name: "",
      price: "",
      description: "",
      category: "main dishes",
      imgSrc: {} as File | null
    },
    newProduct: {
      id: "",
      name: "",
      price: "",
      description: "",
      category: "main dishes",
      imgSrc: {} as File | null
    },
    showAddModal: false,
    showEditModal: false,
  }),

  actions: {
    async getProductList() {
      try {
        this.products = await menuServices.getAll();
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    },

    async addProduct(product: Menu, file:File) {
      try {
        await menuServices.addProduct(product, file);
        await this.getProductList();
        this.showAddModal = false;
      } catch (error) {
        console.error("Error adding a product:", error);
      }
    },

    async removeProduct(product: Menu) {
      try {
        await menuServices.deleteProduct(product);
        await this.getProductList();
      } catch (error) {
        console.error("Error removing a product:", error);
      }
    },

    async editProduct(product: Menu) {
      try {
        await menuServices.editProduct(product);
        await this.getProductList();
        this.showEditModal = false;
      } catch (error) {
        console.error("Error editing a product:", error);
      }
    },

    resetNewProduct() {
      this.newProduct = {
        id: "",
        name: "",
        price: "",
        description: "",
        category: "main dishes",
        imgSrc: null
      };
    },
  },

  getters: {
    filteredProducts(): Menu[] {
      if (!this.products || this.selectedCategory === "all") {
        return this.products.filter(
          (product) =>
            product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.products.filter(
        (product) =>
          product.category === this.selectedCategory &&
          (product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    },

    isAdmin() {
      return usersStore().currentUser;
    },

    modalVisibility(): boolean {
      return this.isEditing || this.showAddModal;
    },
  },
});
