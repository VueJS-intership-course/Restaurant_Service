import ErrorModal from '../common-templates/ErrorModal.vue'
import { mount } from '@vue/test-utils';


const wrapper = mount(ErrorModal, {
    props: {
       errorMsg:'Hello'
    }
});

it('Shoud have label', () => {
    expect(wrapper.text()).toContain('Hello')
})
