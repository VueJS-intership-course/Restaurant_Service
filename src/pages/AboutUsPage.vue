<template>
    <div class="aboutUs">
        <div class="aboutUs-headings">
            <h1>For foodlovers, by foodlovers</h1>
            <h2>We are the fastest growing restaurant in Plovdiv distric.We are known for the quality of our food.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, libero quia esse molestias accusantium ut
                quasi nisi
                dignissimos nemo ratione et autem sit nostrum excepturi quos quis? Facere, rerum eum.</h2>
        </div>
        <div class="aboutUs-images">
            <div v-for="foodImage in foodImages" :key="foodImage.alt" class="aboutUs-images_singleItem">
                <router-link :to="{ path: 'menu' }"><img :src="foodImage.src" :alt="foodImage.alt" /></router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { foodImages } from '../utils/constants';
</script>

<style scoped lang="scss">
@import "../styles/variables";

.aboutUs {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-top: 1rem;

    .aboutUs-headings {
        display: flex;
        position: relative;
        width: 50%;
        left: 24%;
        padding: 2rem;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        text-wrap: balance;
        align-items: center;
        flex-wrap: wrap;
        background-color: $yellow;

        h1 {
            color: $dark-green;
            font-weight: bolder;
            font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        }

    }

    .aboutUs-images {
        display: flex;
        justify-content: center;
        gap: 2rem;
        background-color: $green;
        padding: 1.5rem;

        .aboutUs-images_singleItem {
            img {
                width: 400px;
                height: 300px;
                background-repeat: no-repeat;
                object-fit: cover;
                transition: all 0.6s;
            }

            img:hover {
                transform: translateY(-5%);
            }
        }
    }
}
</style>
