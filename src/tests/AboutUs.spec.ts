import AboutUsPageVue from "@/pages/AboutUsPage.vue";
import { mount } from "@vue/test-utils";

const wrapper = mount(AboutUsPageVue,{
    global: {
        stubs: ['router-link']
    }
});

it('should have 3 images shown' ,() => {
    const images = wrapper.findAll('.aboutUs-images_singleItem');

    expect(images.length).toBe(3)
})

it('should havd the right heading', () => {
    const heading = wrapper.find('h1');

    expect(heading.text()).toBe('For foodlovers, by foodlovers');
})