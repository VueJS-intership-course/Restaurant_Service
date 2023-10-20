<template>
  <div class="wrapper">
    <div>
      <h3>Register</h3>
    </div>
    <form @submit="onSubmit">
      <div>
        <BasicInput name="username" label="Username" />
      </div>
      <div>
        <BasicInput name="email" type="email" label="Email" />
      </div>
      <div>
        <BasicInput name="password" type="password" label="Password" />
      </div>
      <div>
        <BasicInput name="passwordConfirm" type="password" label="Repeat Password" />
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

h3 {
  color: $yellow;
}
</style>
