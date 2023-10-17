<template>
  <div class="wrapper">
    <div>
      <h3>Register</h3>
    </div>
    <form @submit="onSubmit">
      <div>
        <label>Username:</label>
        <BasicInput name="username" />
      </div>
      <div>
        <label>Email:</label>
        <BasicInput name="email" type="email" />
      </div>
      <div>
        <label>Password:</label>
        <BasicInput name="password" type="password" />
      </div>
      <div>
        <label>Repeat Password:</label>
        <BasicInput name="passwordConfirm" type="password" />
      </div>
      <div>
        <ButtonComponent btn-style="default-button-small">Register</ButtonComponent>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "@/common-templates/ButtonComponent.vue";
import { usersStore } from "@/store/usersStore";
import userServices from "@/services/userServices/userServices";
import BasicInput from "@/common-templates/BasicInput.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email("Enter a valid email!").required("This field is required!"),
    username: yup
      .string()
      .required("This field is required!")
      .min(4, "Username must be at least 4 symbols!"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 symbols!")
      .required("This field is required!"),
    passwordConfirm: yup
      .string()
      .required("This field is required!")
      .oneOf([yup.ref("password")], "Passwords does not match!"),
  }),
});

const store = usersStore();

const onSubmit = handleSubmit((values, { resetForm }) => {
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
});
</script>

<style scoped lang="scss">
@import "@/styles/variables";

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
