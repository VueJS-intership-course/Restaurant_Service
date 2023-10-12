<template>
  <div>
    <h3>Create an employee</h3>
  </div>
  <Form @submit="register">
    <div>
      <label>Username</label>
      <Field type="text" name="username" :rules?="usernameRules" />
      <ErrorMessage name="username" />
    </div>
    <div>
      <label>Email:</label>
      <Field type="email" name="email" :rules?="emailRules" />
      <ErrorMessage name="email" />
    </div>
    <div>
      <label>Password:</label>
      <Field name="password" type="password" :rules?="passwordRules" />
      <ErrorMessage name="password" />
    </div>
    <div>
      <label>Repeat Password:</label>
      <Field name="repeatPassword" type="password" :rules?="passwordRepeatRules" />
      <ErrorMessage name="password" />
    </div>
    <div>
      <ButtonComponent btn-style="default-button-small">Register</ButtonComponent>
    </div>
  </Form>
</template>

<script setup lang="ts">
import ButtonComponent from "../../common-templates/ButtonComponent.vue";
import { usersStore } from "../../store/usersStore";
import userServices from "../../services/userServices/userServices";

import { Field, Form, ErrorMessage } from "vee-validate";

interface FormInputs {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const store = usersStore();

const emailRules = (value: string) => {
  if (!value) {
    return "This field is required!";
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "Invalid email entered!";
  }
  return true;
};

const usernameRules = (value: string) => {
  if (!value) {
    return "This field is required!";
  }
  if (value.trim().length < 4) {
    return "Username should be atleast 4 symbols!";
  }

  return true;
};

const passwordRules = (value: string) => {
  if (!value) {
    return "This field is required!";
  }
  if (value.length < 8) {
    return "Password must be atleast 8 symbols!";
  }

  return true;
};

const passwordRepeatRules = (value: string) => {
  if (!value) {
    return "This field is required!";
  }
  return true;
};

const register = (values: FormInputs, { resetForm }) => {
  try {
    userServices.signUp(
      {
        email: values.email,
        username: values.username,
      },
      values.password
    );

    store.getAllUsers();
    resetForm();
  } catch (error) {
    alert(error);
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  padding: 3rem 12rem;
  background-color: $green;
  border-radius: 8%;
}

div {
  text-align: center;
  width: 100%;
  position: relative;
}

span {
  position: absolute;
  color: red;
  left: 0%;
}

h3 {
  color: $yellow;
}

input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: larger;
  text-align: center;
  color: white;
  font-weight: bold;
}
</style>
