<template>
  <!-- ... your existing code ... -->
    <ButtonComponent @click="handleAddProduct" btn-style="default-button-db">
      Add
    </ButtonComponent>
    <ButtonComponent @click="closeAddModal" btn-style="button-danger">
      Cancel
    </ButtonComponent
  >
  </div>
</template>

<script setup lang="ts">
// ... your existing setup code ...

const handleAddProduct = () => {
  // Clear the new product fields when the "Add" button is clicked
  newProduct.value = {
    id: "",
    name: "",
    price: 0,
    description: "",
    category: "main dishes",
  };

  showAddProductModal();
  store.addProduct(newProduct.value);
  closeAddModal();
};

// ... your existing setup code ...
</script>



