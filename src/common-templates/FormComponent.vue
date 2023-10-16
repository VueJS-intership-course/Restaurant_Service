<template>
  <form>
    <slot></slot>
  </form>
</template>

<style scoped lang="scss">
@import "@/styles/variables";

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 3rem 6rem;
  background-color: $green;
  position: absolute;
  top: 35%;
  left: 35%;
  border-radius: 8%;
}
</style>
