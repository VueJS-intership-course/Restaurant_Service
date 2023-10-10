<template>
  <div>
    <h1>Admin Panel Page</h1>
  </div>
  <div>
    <form @submit.prevent="register">
      <div>
        <label>Username</label>
        <input type="text" />
      </div>
      <div>
        <label>Email</label>
        <input v-model="emailInput" type="email" />
      </div>
      <div>
        <label>Password</label>
        <input v-model="passInput" type="password" />
      </div>
      <div>
        <label> Password</label>
        <input v-model="passInput" type="password" />
      </div>
      <div>
        <button>Register</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import firebaseData from "../services/firebaseConfig";

const emailInput: Ref<string | undefined> = ref();
const passInput: Ref<string | undefined> = ref();

const register = () => {
  if (emailInput.value && passInput.value) {
    firebaseData.fireAuth.createUserWithEmailAndPassword(emailInput.value, passInput.value);
  } else {
    // Handle the case where emailInput.value or passInput.value is undefined or null
  }
};
</script>

<style scoped lang="scss"></style>
