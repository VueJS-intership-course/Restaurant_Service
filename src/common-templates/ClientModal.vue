<template>
    <div class="modal">
        <Form class="form" @submit="handleSubmit">
            <div>
                <h1>Enter information for your order</h1>
            </div>
            <div class="form-inputs">
                <div class="form-inputs_username">
                    <label for="name">Name:</label>
                    <Field type="text" name="name"  />
                    <ErrorMessage name="name" />
                </div>
                <div class="form-inputs_password">
                    <label for="phone">Phone:</label>
                    <Field name="phone" type="tel" />
                    <ErrorMessage name="phone" />
                </div>
            </div>
            <div class="form-controls">
                <button-component type="submit" btn-style="default-button-small">Submit</button-component>
            </div>
        </Form>
    </div>
</template>

<script setup lang="ts">
import { Field, Form, ErrorMessage, GenericObject } from 'vee-validate';
import ButtonComponent from './ButtonComponent.vue';
import { useRouter } from 'vue-router';

const emits = defineEmits(['close-modal']);
const router = useRouter()

const handleSubmit = <T extends GenericObject>(values:T) => {
   localStorage.setItem('user', JSON.stringify(values));
   emits('close-modal');
   router.push({name:'menu'})
}

</script>

<style scoped lang="scss">
@import '../styles/variables';

.modal {
    @include modal-style;

    .form {
        @include client-form
    }

    .form-inputs {
        @include input-label
    }
}
</style>