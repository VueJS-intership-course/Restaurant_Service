import CardComponentVue from "@/common-templates/CardComponent.vue";
import { mount } from "@vue/test-utils";

const wrapper = mount(CardComponentVue, {
    slots: {
        default: [
            '<h1>Hello</h1>',
            '<h2>World</h2>'
        ]
    }
});

it('should add content in slots', () => {
    expect(wrapper.html()).toContain('<h1>Hello</h1>')
    expect(wrapper.html()).toContain('<h2>World</h2>')
});