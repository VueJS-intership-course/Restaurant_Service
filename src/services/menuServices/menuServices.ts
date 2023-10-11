import firebaseData from "../firebaseConfig";
import fireBaseData from "../firebaseConfig";

export class Menu {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public description: string
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
      const querySnapshot = await fireBaseData.fireStore
        .collection("menu")
        .get();

      querySnapshot.forEach((doc: any) => {
        const { id, name, price, description } = doc.data();
        const menu = new Menu(id, name, price, description);
        console.log(menu);
        data.push(menu);
      });

      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching menu:", error);
      throw error;
    }
  },

  async addProduct(product: Menu) {
    await fireBaseData.fireStore.collection("menu").add({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
    });
  },

  // async deleteProduct(product: Menu) {
  //   const docRef = fireBaseData.fireStore.collection("menu").doc.id;
  //   try {
  //     await docRef.delete();
  //     console.log("Product deleted successfully");
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // },

  async deleteProduct(product: Menu) {
    firebaseData.fireStore
      .collection("menu")
      .where("id", "==", product.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              console.log("Done");
            })
            .catch((error) => {
              console.error("Error removing item: ", error);
            });
        });
      });
  },

  // async editProduct(product: Menu) {
  //   await fireBaseData.fireStore.collection("menu").doc(product.id).update({
  //     name: product.name,
  //     price: product.price,
  //     description: product.description,
  //   });
  // },

  async editProduct(product: Menu) {
    firebaseData.fireStore
      .collection("menu")
      .where("id", "==", product.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              console.log("Done");
            })
            .catch((error) => {
              console.error("Error removing item: ", error);
            });
        });
      });
  },
};
