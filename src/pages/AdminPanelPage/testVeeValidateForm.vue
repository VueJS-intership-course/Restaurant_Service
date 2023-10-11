<template>
  <Form @submit="createUser">
    <div>
      <label>Username</label>
      <Field name="username" type="text" :rules="validateUsername" />
      <ErrorMessage name="username" />
    </div>
    <div>
      <button>Submit</button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form, ErrorMessage } from "vee-validate";

const createUser = (value) => {
  console.log(value);
};

const validateUsername = (value) => {
  if (!value) {
    return "This field is required!";
  }
};
</script>
