<template>
  <div>
    <h3>Users list</h3>
  </div>
  <div>
    <ul>
      <li v-for="user in users" :key="user.email">
        <p>{{ user.username }}</p>
        <p>{{ user.role }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import userServices from "../../services/userServices/userServices";
import { ref, onMounted } from "vue";

const users = ref();

onMounted(async () => {
  users.value = await userServices.getAll();
});
</script>
