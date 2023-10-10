<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
@import '../styles/_variables.scss';

.card {
    display: flex;
    position: absolute;
    left: 20%;
    top: 20%;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    background-color: $green;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 10rem;
    margin: 2rem auto;
    max-width: 30rem;
}
</style>