<template>
  <div>
    <h3>Users list</h3>
  </div>
  <div>
    <table>
      <tr>
        <th v-for="(label, index) in columnLabels" :key="index">{{ label }}</th>
      </tr>
      <tr v-for="user in store.userList" :key="user.username">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.id }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
// import userServices from "../../services/userServices/userServices";
import { ref } from "vue";
import type { Ref } from "vue";
import { onMounted } from "vue";
import { usersStore } from "@/store/usersStore";

// const users = ref();

const store = usersStore();

const columnLabels: Ref<string[]> = ref(["Username", "Email", "ID"]);

onMounted(async () => {
  store.getAllUsers();
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

li {
  list-style-type: none;
  border: 1px solid black;
}

table {
  border: 1px solid black;
  padding: 1.5rem;
  min-width: 20rem;
  background-color: $green;
}

td {
  border: 1px solid black;
  padding: 0.25rem 1rem;
  background-color: $blue;
  border-radius: 0.25rem;
}
</style>
