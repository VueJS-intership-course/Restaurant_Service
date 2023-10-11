<template>
    <div class="modal" @click="closeModal">
        <div class="error-message">
            <h1>{{ props.errorMsg }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
/*
   imports
*/
import { defineProps } from 'vue';
/*
   props
*/

const props = defineProps({
    errorMsg: {
        type: String,
        required: true
    }
});

/*
   emits
*/

const emits = defineEmits(['close-modal']);

/*
   close modal
*/

const closeModal = () => {
    emits('close-modal')
}
</script>


<style scoped lang="scss">
@import '../styles/variables';

.modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background: $modal;
    z-index: 2;

    .error-message {
        display: flex;
        position: absolute;
        left: 25%;
        top: 20%;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        background-color: $yellow;
        color: red;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        padding: 5rem;
        margin: 2rem auto;
        max-width: 30rem;
    }
}
</style>