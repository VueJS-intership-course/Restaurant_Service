<template>
  <ErrorModal v-if="errorMsg" :error-msg="errorMsg" @close-modal="closeModal"></ErrorModal>
  <Form @submit="signIn" :validation-schema="schema">
    <div>
      <h1>Sign In</h1>
    </div>
    <div class="form-inputs">
      <div class="form-inputs_username">
        <label for="email">Email:</label>
        <Field type="email" name="email" />
        <ErrorMessage name="email" />
      </div>
      <div class="form-inputs_password">
        <label for="password">Password:</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />
      </div>
    </div>
    <div class="form-controls">
      <button-component type="submit" btn-style="default-button-small">Submit</button-component>
    </div>
  </Form>
</template>

<script setup lang="ts">
/*
    imports
*/
import { ref } from "vue";
import ButtonComponent from "@/common-templates/ButtonComponent.vue";
import userServices from "@/services/userServices/userServices";
import { useRouter } from "vue-router";
import { Field, Form, ErrorMessage, GenericObject } from "vee-validate";
import ErrorModal from "@/common-templates/ErrorModal.vue";
import * as yup from 'yup';

/*
    router
*/

const router = useRouter();

/*
    validation
*/

const errorMsg = ref<string>("");

const schema = yup.object({
  email: yup.string().email("Enter a valid email!").required("This field is required!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 symbols!")
    .required("This field is required!"),
});


/*
    sign in
*/

const signIn = async <T extends GenericObject>(values: T) => {
  try {
    await userServices.signIn(values.email, values.password);
    router.push({ path: "menu" });
  } catch (error: any) {
    errorMsg.value = error.message;
  }
};

/*
    close modal
*/

const closeModal = () => {
  errorMsg.value = "";
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

h1 {
  color: $yellow;
}

form {
  @include client-form;

  span {
    color: red;
    font-size: large;
  }

  .form-inputs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .form-inputs_username {
      @include input-label;
    }

    .form-inputs_password {
      @include input-label;
    }
  }
}
</style>
