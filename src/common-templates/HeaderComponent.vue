<template>
  <nav>
    <div>
      <RouterLink :to="'/'">
        <img src="../assets/logo-full.png" class="logo" />
      </RouterLink>
    </div>
    <ul>
      <li>
        <RouterLink :to="'/login'" class="navbar-link">
          <span>Login</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="'/control-panel'" class="navbar-link">
          <span>Admin Panel</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="'/orders'" class="navbar-link">
          <span>Orders</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="'/menu'" class="navbar-link">
          <span>Menu</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="'/about'" class="navbar-link">
          <span>About Us</span>
        </RouterLink>
      </li>
      <li>
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import userServices from '../services/userServices/userServices'
const logout = async () => {
  await userServices.logout()
}
</script>


<style scoped lang="scss">
@import "../styles/_variables.scss";
nav {
  display: flex;
  background-color: $green;
  width: 100%;

  ul {
    display: flex;
    align-items: center;
    gap: 30px;
    list-style: none;
    margin-left: auto;
    padding-right: 50px;

    li {
      font-size: 18px;
      font-weight: bold;

      .navbar-link {
        text-decoration: none;
        color: #f7cf64;

        :hover {
          color: #79e59b;
        }
      }
    }
  }

  .logo {
    height: 100px;
  }
}
</style>
