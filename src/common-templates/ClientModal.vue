<template>
    <div class="modal" @click.self="$emit('close-modal')">
        <Form class="form" @submit="handleSubmit" :validation-schema="schema">
            <div>
                <h1>Enter information for your order</h1>
            </div>
            <div class="form-inputs">
                <div class="form-inputs_username">
                    <label for="name">Name:</label>
                    <Field type="text" name="name" />
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
import { Field, Form, ErrorMessage, GenericObject } from "vee-validate";
import ButtonComponent from "./ButtonComponent.vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import { usersStore } from "@/store/usersStore";

const emits = defineEmits(["close-modal"]);
const router = useRouter();
const userStore = usersStore()

const handleSubmit = <T extends GenericObject>(values: T) => {
    localStorage.setItem("user", JSON.stringify(values));
    userStore.getItemsFromLocal()
    emits("close-modal");
    router.push({ name: "menu" });
};

const schema = yup.object({
    name: yup
        .string()
        .required("This field is required!")
        .min(2, "Name should be atleast two symbols!"),
    phone: yup
        .string()
        .required("This field is required!")
        .min(10, "Please enter a valid phone number!")
        .max(13, "Please enter a valid phone number!"),
});
</script>

<style scoped lang="scss">
@import "@/styles/variables";

.modal {
    @include modal-style;

    .form {
        @include client-form;
    }

    .form-inputs {
        @include input-label;
    }

    span {
        color: red;
    }
}
</style>
