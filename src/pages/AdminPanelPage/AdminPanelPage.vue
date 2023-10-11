<template>
  <div class="wrapper">
    <div>
      <h1>Admin Panel Page</h1>
    </div>
    <ButtonComponent @click="panelChange">{{ viewName }}</ButtonComponent>
    <div v-if="section">
      <RegisterForm />
    </div>
    <div v-else>
      <UsersList />
    </div>
    <div>
      <TestVeeValidateForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "../../common-templates/ButtonComponent.vue";
import RegisterForm from "./RegisterForm.vue";
import UsersList from "./UsersList.vue";
import { ref, computed } from "vue";
import type { Ref } from "vue";
import TestVeeValidateForm from "./testVeeValidateForm.vue";

const section: Ref<boolean> = ref(true);

const panelChange = () => {
  section.value = !section.value;
};

const viewName = computed(() => {
  return section.value ? "Employees list" : "Create an Empoyee";
});
</script>

<style scoped lang="scss">
.wrapper {
  margin: auto;
  display: flex;
  width: 40%;
  flex-direction: column;
  align-items: center;
}
</style>
