import BasicInput from '../common-templates/BasicInput.vue'
import { mount } from '@vue/test-utils';

const wrapper = mount(BasicInput, {
    props: {
        name:'password',
        type:'password',
        label:'Password'
    }
});

it('Shoud have label', () => {
    expect(wrapper.find('label').text()).toBe('Password:')
})

it('Shoud have input', () => {
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
})