import ErrorModal from "../common-templates/ErrorModal.vue";
import { mount } from "@vue/test-utils";

const message = "Hello";

const wrapper = mount(ErrorModal, {
  props: {
    errorMsg: message,
  },
});

it("Shoud have message", () => {
  expect(wrapper.text()).toContain("Hello");
});

it("should not show modal by default", async () => {
  const modal = wrapper.find("modal");

  expect(modal.exists()).toBe(false);
});
