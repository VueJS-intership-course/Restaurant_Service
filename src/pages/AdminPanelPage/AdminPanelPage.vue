<template>
  <div>
    <h1>Admin Panel Page</h1>
  </div>
  <ButtonComponent @click="viewChange">{{ viewName }}</ButtonComponent>
  <div v-if="section">
    <RegisterForm />
  </div>
  <div v-else>
    <UsersList />
  </div>
  <div></div>
</template>

<script setup lang="ts">
import ButtonComponent from "../../common-templates/ButtonComponent.vue";
import RegisterForm from "./RegisterForm.vue";
import UsersList from "./UsersList.vue";
import { ref, computed } from "vue";
import type { Ref } from "vue";

const section: Ref<boolean> = ref(true);

const viewChange = () => {
  section.value = !section.value;
};

const viewName = computed(() => {
  return section.value ? "Create an Empoyee" : "Employees list";
});
</script>

<style scoped lang="scss"></style>
