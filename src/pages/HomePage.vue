<template>
    <card-component>
        <h1>Welcome to Ninja Turtles Restaurant</h1>
        <div>
            <button @click="changePage('menu')">Client</button>
            <button @click="changePage('login')">Employee</button>
        </div>
    </card-component>
</template>

<script setup lang="ts">
/*
   imports
*/

import CardComponent from '../common-templates/CardComponent.vue';
import { useRouter } from 'vue-router';

/*
    router
*/


const router = useRouter();

const changePage = (page: string) => {
    router.push({ path: page })
}

</script>

<style scoped lang="scss">
@import '../styles/variables';

h1 {
    font-size: xx-large;
    text-wrap: balance;
    text-align: center;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
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
