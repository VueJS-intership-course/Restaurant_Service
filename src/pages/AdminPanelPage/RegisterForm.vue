<template>
  <div>
    <h3>Create an employee</h3>
  </div>
  <form @submit.prevent="register">
    <div>
      <label>Username</label>
      <input type="text" v-model="usernameInput" />
    </div>
    <div>
      <label>Email:</label>
      <input v-model="emailInput" type="email" />
    </div>
    <div>
      <label>Role:</label>
      <select v-model="roleInput">
        <option v-for="role in roles">{{ role }}</option>
      </select>
    </div>
    <div>
      <label>Password:</label>
      <input v-model="passInput" type="password" />
    </div>
    <div>
      <label>Repeat Password:</label>
      <input v-model="repeatPassInput" type="password" />
    </div>
    <div>
      <ButtonComponent btn-style="default-button-small">Register</ButtonComponent>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import userServices from "../../services/userServices/userServices";
import ButtonComponent from "../../common-templates/ButtonComponent.vue";
import { usersStore } from "../../store/usersStore";

// import { Field, Form, ErrorMessage } from "vee-validate";

const store = usersStore();

const roles: string[] = ["employee", "admin", "manager"];

const usernameInput: Ref<string> = ref("");
const roleInput: Ref<"employee" | "admin" | "manager"> = ref("employee");
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
          role: roleInput.value,
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
