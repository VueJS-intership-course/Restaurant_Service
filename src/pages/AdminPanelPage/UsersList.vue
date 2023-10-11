<template>
  <div>
    <h3>Users list</h3>
  </div>
  <div>
    <ul>
      <li v-for="user in store.userList" :key="user.email">
        <p>{{ user.username }}</p>
        <p>{{ user.email }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// import userServices from "../../services/userServices/userServices";
import { onMounted } from "vue";
import { usersStore } from "../../store/usersStore";

// const users = ref();

const store = usersStore();

onMounted(async () => {
  store.getAllUsers();
});
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
  border: 1px solid black;
}
</style>
