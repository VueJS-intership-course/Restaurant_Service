import OrdersPageVue from "@/pages/OrdersPage/OrdersPage.vue";
import { mount, shallowMount } from "@vue/test-utils";
import { useCartStore } from "@/store/orderStore.ts";
import { createTestingPinia } from "@pinia/testing";
import { createPinia, setActivePinia } from "pinia";

setActivePinia(createPinia());

jest.mock("firebase/app", () => {
  return {
    initializeApp: jest.fn(),
    auth: jest.fn(),
    firestore: jest.fn(),
  };
});

const wrapper = shallowMount(OrdersPageVue, {
  global: {
    plugins: [
      createTestingPinia({
        initialState: {
          cartStore: useCartStore(),
        },
      }),
    ],
  },
});

const cartStore = useCartStore();
cartStore.$patch({
  cartItems: [
    {
      category: "drinks",
      description: "Sweat rum",
      id: "24",
      name: "Rum",
      price: 6,
    },
  ],
});

describe("OrdersPageVue", () => {
  it("renders the OrdersPageVue component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
