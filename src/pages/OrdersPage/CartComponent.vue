<template>
  <div class="cart-container">
    <h1>Your Cart</h1>
    <div class="cart-items">
      <div v-if="cartStore.uniqueOrders.length === 0" class="empty-cart">
        Your cart is empty
      </div>
      <div v-else class="meal-container" v-for="order in cartStore.uniqueOrders" :key="order.id">
        <div class="cart-item">
          <div class="item-info">
            <span class="item-name">{{ order.name }}</span>
            <span class="item-price">{{ order.price * order.count }}$</span>
          </div>
          <div class="item-quantity">
            <span class="notification">{{ mealCounter(order.id) }}</span>
          </div>
          <div class="buttons">
            <button @click="handleAddMeal(order.id, order.name)" class="add-button">
              +
            </button>
            <button @click="handleRemoveMeal(order.id, order.name)" class="remove-button">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../../store/orderStore.ts';
import showNotification from "../../utils/notifications";

const cartStore = useCartStore();

const mealCounter = (mealId: string) => {
  const count = cartStore.cartItems.filter(
    (order) => order.id === mealId
  ).length;
  return count;
};

const handleAddMeal = (mealId: string, meal: string) => {
  const index = cartStore.cartItems.find((product) => product.id === mealId);
  console.log(index);

  if (index) {
    cartStore.addToCart(index);
    showNotification(`${meal} has been added to cart.`)
  }
};

const handleRemoveMeal = (mealId: string, meal: string) => {
  const index = cartStore.cartItems.findIndex((order) => order.id === mealId);

  if (index !== -1) {
    cartStore.removeFromCart(index);
    showNotification(`${meal} has been removed from cart.`)
  }
};
</script>

<style scoped lang="scss">
.cart-container {
  padding: 20px;
  width: 500px;

  .cart-items {
    display: flex;
    flex-direction: column;
    align-items: center;

    .empty-cart {
      font-size: 24px;
      color: #555;
    }

    .meal-container {
      width: 100%;
      max-width: 400px;
      background-color: #f7cf64;
      margin: 10px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

      .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        width: 350px;
        height: 50px;

        .item-info {
          flex: 2;
          display: flex;
          flex-direction: column;

          .item-name {
            font-size: 18px;
            font-weight: bold;
          }

          .item-price {
            font-size: 16px;
            color: #555;
          }
        }

        .item-quantity {
          flex: 1;
          display: flex;
          align-items: center;

          .notification {
            display: flex;
            align-self: flex-end;
            font-size: 16px;
            color: white;
            background-color: #266488;
            padding: 5px 10px;
            border-radius: 10px;
          }
        }

        .buttons {
          display: flex;
          gap: 10px;

          .add-button {
            background-color: #5aaa6e;
            color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-weight: bold;
            padding: 8px 15px;
            max-height: 33px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .remove-button {
            background-color: #dc3545;
            color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-weight: bold;
            padding: 8px 15px;
            max-height: 33px;
            cursor: pointer;
            transition: background-color 0.3s;

            .remove-button:hover {
              background-color: #c82333;
            }
          }
        }
      }
    }
  }
}
</style>