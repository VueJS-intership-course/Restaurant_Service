<template>
  <input type="text" :class="inputStyle"/>

</template>

<script setup lang="ts">
defineProps({
  inputStyle: {
    type: String,
    default: "default-input",
  },
});
</script>



<style lang="scss" scoped>
.default-input {
    background-color: rgb(0, 119, 255);
  color: rgb(255, 255, 255);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.input-large{
//todo
}

.input-default{
//todo
}

</style>
