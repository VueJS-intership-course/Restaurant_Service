import fireBaseData from "../firebaseConfig";

export class Menu {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public description: string,
    public category: string
  ) {}
}

function validateMenu(menuItem: Menu) {
  if (!menuItem.name) {
    throw new Error("Add proper dish name!");
  }

  if (!menuItem.description) {
    throw new Error("Add proper description for the dish!");
  }

  if (!menuItem.price || menuItem.price < 0) {
    throw new Error("Add valid and non negative price for the dish!");
  }
}

export default {
  async getAll() {
    try {
      const data: Menu[] = [];
      const querySnapshot = await fireBaseData.fireStore.collection("menu").get();

      querySnapshot.forEach((doc: any) => {
        const { id, name, price, description, category } = doc.data();
        const menu = new Menu(id, name, price, description, category);
        data.push(menu);
      });
      return data;
    } catch (error) {
      console.error("Error fetching menu:", error);
      throw error;
    }
  },

  async addProduct(product: Menu) {
    try {
      validateMenu(product);

      await fireBaseData.fireStore.collection("menu").add({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
      });
    } catch (error) {
      console.error("Error validating menu item:", error);
      throw error;
    }
  },

  async deleteProduct(product: Menu) {
    fireBaseData.fireStore
      .collection("menu")
      .where("id", "==", product.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              console.log("Done deleting");
            })
            .catch((error) => {
              console.error("Error removing item: ", error);
            });
        });
      });
  },

  async editProduct(product: Menu) {
    fireBaseData.fireStore
      .collection("menu")
      .where("id", "==", product.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .update({
              name: product.name,
              price: product.price,
              description: product.description,
              category: product.category,
            })
            .then(() => {
              console.log("Done editing");
            })
            .catch((error) => {
              console.error("Error removing item: ", error);
            });
        });
      });
  },
};
