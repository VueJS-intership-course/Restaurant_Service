import HeaderComponentVue from "@/common-templates/HeaderComponent.vue";
import { mount } from "@vue/test-utils";

const wrapper = mount(HeaderComponentVue);

jest.mock('@/services/userServices/userServices',() => {
    return {
        getAll: jest.fn(),
    }
})

it('should not render logout', () => {
   expect(wrapper.find('login').exists()).toBe(true);
})