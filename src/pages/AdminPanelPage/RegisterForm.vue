<template>
  <div>
    <h3>Create an employee</h3>
  </div>
  <Form @submit.prevent="register">
    <div>
      <label>Username</label>
      <Field type="text" name="username" />
      <ErrorMessage name="username" />
    </div>
    <div>
      <label>Email:</label>
      <Field type="email" name="email" />
      <ErrorMessage name="email" />
    </div>
    <div>
      <label>Role:</label>
      <Field name="role" as="select">
        <option v-for="role in roles">{{ role }}</option>
      </Field>
    </div>
    <div>
      <label>Password:</label>
      <Field name="password" type="password" />
      <ErrorMessage name="password" />
    </div>
    <div>
      <label>Repeat Password:</label>
      <Field name="repeatPassword" type="password" />
      <ErrorMessage name="password" />
    </div>
    <div>
      <ButtonComponent btn-style="default-button-small">Register</ButtonComponent>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import userServices from "../../services/userServices/userServices";
import ButtonComponent from "../../common-templates/ButtonComponent.vue";
import { usersStore } from "../../store/usersStore";

import { Field, Form, ErrorMessage } from "vee-validate";

const store = usersStore();

const usernameInput: Ref<string> = ref("");
const emailInput: Ref<string> = ref("");
const passInput: Ref<string | undefined> = ref();
const repeatPassInput: Ref<string | undefined> = ref();

const register = () => {
  if (emailInput.value && passInput.value) {
    try {
      userServices.signUp(
        {
          email: emailInput.value,
          username: usernameInput.value,
        },
        passInput.value
      );
      emailInput.value = "";
      usernameInput.value = "";
      passInput.value = "";
      repeatPassInput.value = "";
      store.getAllUsers();
    } catch (error) {
      alert(error);
    }
  }
};
</script>
