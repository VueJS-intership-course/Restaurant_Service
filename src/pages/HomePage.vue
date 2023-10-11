<template>
    <card-component>
        <h1>Welcome to Ninja Turtles Restaurant</h1>
        <div>
            <button>Client</button>
            <button>Employee</button>
        </div>
    </card-component>
    <button @click="logout">Logout</button>
    <button @click="login">login</button>
</template>

<script setup lang="ts">
import CardComponent from '../common-templates/CardComponent.vue';
import userServices from '../services/userServices/userServices'

const login = async () => {
    await userServices.signIn('Adming@abv.bg', '123456789')
}


const logout = async () => {
    await userServices.logout()
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
        background: $dark-yellow;
        padding: 0.4rem 1.5rem;
        border: solid $yellow ;
        font-size: 1rem;
        border-radius: 5%;
        cursor: pointer;
        opacity: 0.8;
        transition: all 0.5s;
    }

    button:hover {
        opacity: 1;
        background: $yellow;
    }
}
</style>
