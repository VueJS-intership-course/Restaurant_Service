import HeaderComponentVue from "@/common-templates/HeaderComponent.vue";
import { usersStore } from "@/store/usersStore";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"
import userServices from "@/services/userServices/userServices";

setActivePinia(createPinia())

jest.mock('@/services/userServices/userServices', () => {
    return {
        getAll: jest.fn(),
        logout: jest.fn()
    }
});

jest.mock('firebase/app', () => {
    return {
        initializeApp: jest.fn(),
        auth: jest.fn(),
        firestore: jest.fn()
    }
})


jest.mock("@/common-templates/ButtonComponent.vue");

jest.mock('vue3-toastify', () => ({
    toast: jest.fn
}))



const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})



const wrapper = shallowMount(HeaderComponentVue, {
    global: {
        stubs: ["RouterLink"],
        plugins: [
            createTestingPinia({
                initialState: {
                    usersStore: usersStore()
                },
            }),
            router
        ]
    }
});

const logoutBtn = wrapper.find('#logout');
const users = usersStore();
users.currentUser = null;
users.client = {
    name: 'Georgi',
    phone: '0881238123'
}




it('should render logout', async () => {
    expect(logoutBtn.exists()).toBe(true)
});

it('should show menu', () => {
    expect(wrapper.exists()).toBe(true)
});

it('should remove the client credentials when logout', async () => {
    const logout = jest.spyOn(userServices, 'logout');

    await logoutBtn.trigger('click');

    expect(logout).toBeCalled()
});

it('should logout Function direct to other page', async () => {
    const push = jest.spyOn(router, 'push')

    await logoutBtn.trigger('click');

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({ name: "entry" })
});


it('should remove client credentials', async () => {
    users.clearClient()

    expect(users.client).toBe(null)
})

