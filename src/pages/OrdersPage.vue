<template>
  <div class="order-page">
    <div class="orders">
      <h1>Orders</h1>
      <div class="meal-price">
        <span>Meal:</span>
        <span>Price:</span>
      </div>
    </div>
    <div class="total">
      <h1>Total</h1>
      <div>
        <span>Sum(number)</span>
        <button>Order</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.order-page {
  display: flex;
  flex-direction: row;
  gap: 79px;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  .orders {
    background-color: #f7cf64;
    padding: 20px;
    width: 72%;
    border-radius: 10px;

    h1 {
      color: black;
    }
    .meal-price {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 25px;
      margin-top: 10px;

      span {
        font-size: 20px;
        color: black;
      }
    }
  }
}

.total {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
  background-color: #d44435;
  color: black;
  padding: 20px;
  border-radius: 10px;

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    button {
      width: 100px;
      background-color: red;
      color: black;
      font-weight: bold;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
    }
  }

}
</style>
