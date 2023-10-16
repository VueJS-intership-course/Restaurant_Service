<template>
  <ErrorModal v-if="errorMsg" :error-msg="errorMsg" @close-modal="closeModal"></ErrorModal>
  <Form @submit="signIn">
    <div>
      <h1>Sign In</h1>
    </div>
    <div class="form-inputs">
      <div class="form-inputs_username">
        <label for="email">Email:</label>
        <Field type="email" name="email" :rules="emailRules as RuleExpression<unknown>" />
        <ErrorMessage name="email" />
      </div>
      <div class="form-inputs_password">
        <label for="password">Password:</label>
        <Field
          name="password"
          type="password"
          :rules="passwordRules as RuleExpression<unknown>"
        />
        <ErrorMessage name="password" />
      </div>
    </div>
    <div class="form-controls">
      <button-component type="submit" btn-style="default-button-small"
        >Submit</button-component
      >
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
import { Field, Form, ErrorMessage, GenericObject, RuleExpression } from "vee-validate";
import ErrorModal from "@/common-templates/ErrorModal.vue";

/*
    router
*/

const router = useRouter();

/*
    validation
*/

const errorMsg = ref<string>("");

const emailRules = (value: string) => {
  if (!value) {
    return "Email field is required!";
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "Invalid email entered!";
  }
  return true;
};

const passwordRules = (value: string) => {
  if (!value) {
    return "Password field is required!";
  }
  if (value.length < 8) {
    return "Password must be at least 8 symbols!";
  }
  return true;
};

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 3rem 6rem;
  background-color: $green;
  position: absolute;
  top: 35%;
  left: 40%;
  border-radius: 8%;

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
