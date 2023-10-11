<template>
    <error-modal v-show="erorrShown" :error-msg="errorMsg" @close-modal="closeModal"></error-modal>
    <form-component @submit.prevent="signIn">
        <div>
            <h1>Sign In</h1>
        </div>
        <div class="form-inputs">
            <div class="form-inputs_username">
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" v-model="email">
            </div>
            <div class="form-inputs_password">
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" v-model="password">
            </div>
        </div>
        <div class="form-controls">
            <button-component type="submit" btn-style="default-button-small ">Submit</button-component>
        </div>
    </form-component>
</template>

<script setup lang="ts">
/*
    imports
*/
import { ref, computed } from 'vue';
import FormComponent from '../../common-templates/FormComponent.vue';
import ButtonComponent from '../../common-templates/ButtonComponent.vue';
import userServices from '../../services/userServices/userServices';
import ErrorModal from '../../common-templates/ErrorModal.vue';

/*
    login
*/

const email = ref<string>('');
const password = ref<string>('');
const errorMsg = ref<string>('');

const validateLogin = (email: string, password: string) => {
    if (!email.length || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        throw new Error('Invalid email, please try again!')
    }

    if (password.length < 8 || !password.length) {
        throw new Error('Invalid password, please try again!')
    }
}

const erorrShown = computed(() => errorMsg.value.length > 1);

const signIn = async () => {
    try {
        validateLogin(email.value, password.value);
        await userServices.signIn(email.value, password.value)
    } catch (error:any) {
        errorMsg.value = error.message
    }
}

/*
   modal
*/

const closeModal = () => {
   errorMsg.value = '';
}
</script>


<style scoped lang="scss">
@import '../../styles/variables';

h1 {
    color: $yellow
}

.form-inputs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .form-inputs_username {
        @include input-label
    }

    .form-inputs_password {
        @include input-label
    }
}
</style>