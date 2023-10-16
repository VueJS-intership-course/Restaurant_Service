<template>
    <card-component>
        <h1>Welcome to Ninja Turtles Restaurant</h1>
        <div>
            <button @click="showModal">Client</button>
            <button @click="$router.push({ name: 'employeeLogin' })">Employee</button>
        </div>
    </card-component>
    <client-modal v-if="isShown" @close-modal="closeModal"></client-modal>
</template>

<script setup lang="ts">
/*
   imports
*/
import { useRouter } from 'vue-router';
import CardComponent from '../common-templates/CardComponent.vue';
import ClientModal from '../common-templates/ClientModal.vue';
import { ref } from 'vue';

const isShown = ref<boolean>(false);
const router = useRouter()

const showModal = () => {
    if (!localStorage.getItem('user')) {
        isShown.value = true;
    } else {
        router.push({ name: 'menu' })
    }
}

const closeModal = () => {
    isShown.value = false;
}

</script>

<style scoped lang="scss">
@import "@/styles/variables";

h1 {
  font-size: xx-large;
  text-wrap: balance;
  text-align: center;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: $yellow;
}

div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  button {
    @include main-button;
  }

  button:hover {
    opacity: 1;
    background: $yellow;
  }
}
</style>
