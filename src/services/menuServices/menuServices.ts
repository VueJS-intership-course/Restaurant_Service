import fireBaseData from "@/services/firebaseConfig";
import uploadImage from "@/utils/imageConvertor";

export class Menu {
  constructor(
    public id: string,
    public name: string,
    public price: number | String,
    public description: string,
    public category: string,
    public imgSrc?: File 
  ) {}
}

function validateMenu(menuItem: Menu) {
  if (!menuItem.name) {
    throw new Error("Add proper dish name!");
  }

  if (!menuItem.description) {
    throw new Error("Add proper description for the dish!");
  }

  if (typeof menuItem.price === "number" && menuItem.price < 0) {
    throw new Error("Add valid and non negative price for the dish!");
  }
}

export default {
  async getAll() {
    try {
      const data: Menu[] = [];
      const querySnapshot = await fireBaseData.fireStore.collection("menu").get();

      querySnapshot.forEach((doc: any) => {
        const { id, name, price, description, category, imgSrc } = doc.data();
        const menu = new Menu(id, name, price, description, category, imgSrc);
        data.push(menu);
      });
      return data;
    } catch (error) {
      console.error("Error fetching menu:", error);
      throw error;
    }
  },

  async addProduct(product: Menu, file:File) {
    try {
      validateMenu(product);

       
      const blobImg =  await uploadImage(file, 'menu');

      await fireBaseData.fireStore.collection("menu").add({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        imgSrc: blobImg,
      });
    } catch (error) {
      console.error("Error validating menu item:", error);
      throw error;
    }
  },

  async deleteProduct(product: Menu) {
    const querySnapshot = await fireBaseData.fireStore
      .collection("menu")
      .where("id", "==", product.id)
      .get();
    if (querySnapshot.docs.length > 0) {
      const doc = querySnapshot.docs[0];
      try {
        await doc.ref.delete();
      } catch (error) {
        console.error("Error removing item: ", error);
      }
    }
  },

  async editProduct(product: Menu) {
    const querySnapshot = await fireBaseData.fireStore
      .collection("menu")
      .where("id", "==", product.id)
      .get();

    const doc = querySnapshot.docs[0];
    try {
      await doc.ref.update({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
      });
    } catch (error) {
      console.error("Error editing item: ", error);
    }
  },
};
