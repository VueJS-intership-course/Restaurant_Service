<template>
    <card-component>
        <h1>Welcome to Ninja Turtles Restaurant</h1>
        <div>
            <button @click="$router.push({name:'menu'})">Client</button>
            <button @click="$router.push({name:'employeeLogin'})">Employee</button>
        </div>
    </card-component>
</template>

<script setup lang="ts">
/*
   imports
*/

import CardComponent from '../common-templates/CardComponent.vue';
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
