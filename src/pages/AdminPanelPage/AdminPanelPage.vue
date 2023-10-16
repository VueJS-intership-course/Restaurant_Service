<template>
  <div class="wrapper">
    <div>
      <h1>Admin Panel Page</h1>
    </div>
    <div class="routes-wrapper">
      <RouterLink :to="{ name: 'registerEmployee' }">Add Employee</RouterLink>
      <RouterLink :to="{ name: 'usersList' }">Users List</RouterLink>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "../../styles/variables";
.wrapper {
  margin: auto;
  display: flex;
  width: 40%;
  flex-direction: column;
  align-items: center;
}

.routes-wrapper {
  display: flex;
  gap: 2rem;
}

a {
  text-decoration: none;
  padding: 1rem 2rem;
  background-color: $yellow;
  color: black;
  border-radius: 1rem;
  border: 2px solid transparent;
}

.active {
  background-color: $light-yellow;
  border: 2px solid $green;
}
</style>
