import ButtonComponentVue from "@/common-templates/ButtonComponent.vue";
import { mount } from "@vue/test-utils";

describe("ButtonComponent.vue", () => {
  it("renders props.text when passed", () => {
    const text = "new message";
    const wrapper = mount(ButtonComponentVue, {
      propsData: { text }
    });
    expect(wrapper.text()).toMatch(text);
  });
});