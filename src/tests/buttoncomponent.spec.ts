import ButtonComponent from "../common-templates/ButtonComponent.vue";
import { mount } from "@vue/test-utils";

describe('ButtonComponent', () => {
    it('renders a default button', () => {
      const wrapper = mount(ButtonComponent);
      expect(wrapper.classes()).toContain('default-button');
    });
  
    it('renders a button with style props', () => {
      const customStyle = 'default-button-green';
      const wrapper = mount(ButtonComponent, {
        props: {
          btnStyle: customStyle,
        },
      });
      expect(wrapper.classes()).toContain(customStyle);
    });
  
    it('emits a click event when clicked', async () => {
      const wrapper = mount(ButtonComponent);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });

  });