<template>
  <div class="wrapper">
    <div>
      <h3>Register</h3>
    </div>
    <Form @submit="register" :validation-schema="schema">
      <div>
        <label>Username:</label>
        <Field type="text" name="username" />
        <ErrorMessage name="username" />
      </div>
      <div>
        <label>Email:</label>
        <Field type="email" name="email" />
        <ErrorMessage name="email" />
      </div>
      <div>
        <label>Password:</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />
      </div>
      <div>
        <label>Repeat Password:</label>
        <Field name="repeatPassword" type="password" />
        <ErrorMessage name="repeatPassword" />
      </div>
      <div>
        <ButtonComponent btn-style="default-button-small">Register</ButtonComponent>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "../../common-templates/ButtonComponent.vue";
import { usersStore } from "../../store/usersStore";
import userServices from "../../services/userServices/userServices";

// import { RuleExpression } from "vee-validate";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

interface FormInputs {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().required().min(4, "Username must be at least 4 symbols!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 symbols!")
    .required("This field is required!"),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

const store = usersStore();

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
    // Add toastify
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  padding: 3rem 12rem;
  background-color: $green;
  border-radius: 8%;
  div {
    text-align: center;
    width: 100%;
    position: relative;
  }
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
  min-width: 12rem;
}

label {
  font-size: larger;
  text-align: center;
  color: white;
  font-weight: bold;
}
</style>
