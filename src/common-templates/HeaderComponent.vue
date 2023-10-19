<template>
  <nav>
    <div>
      <RouterLink :to="'/'">
        <img src="../assets/logo-full.png" class="logo" />
      </RouterLink>
    </div>
    <ul>
      <li v-if="store.client?.name">
        <h2>Hello, {{ store.client.name}}</h2>
      </li>
      <li>
        <RouterLink v-if="!isLoggedIn && !store.client?.name" :to="'/login'" class="navbar-link">
          <span>Login</span>
        </RouterLink>
      </li>
      <li v-if="store.currentUser">
        <span>{{ store.currentUser.email }}</span>
      </li>
      <li v-if="!store.client?.name">
        <RouterLink :to="'/control-panel'" class="navbar-link">
          <span>Admin Panel</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="'/orders'" class="navbar-link">
          <span v-if="isAdmin">Orders</span>
          <span v-if="!isAdmin">Cart</span>
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
        <ButtonComponent v-if="isLoggedIn || store.client?.name" @click="logout" class="default-button-small">Logout</ButtonComponent>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
/*
   imports
*/
import userServices from "@/services/userServices/userServices";
import ButtonComponent from "@/common-templates/ButtonComponent.vue";
import { computed } from "vue";
import { usersStore } from "@/store/usersStore";
import { useRouter } from "vue-router";


/*
    router
*/
const router = useRouter();

/*
   logout
*/
const logout = async () => {
  await userServices.logout();
  store.clearClient()
  router.push({ path: "/" });
};

/*
   store
*/

const store = usersStore();

/*
   Change in authentication
*/

const isLoggedIn = computed(() => store.currentUser !== null);
const isAdmin = computed(() => store.currentUser);

store.getClientDataFromlocal()

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

  .active {
    text-decoration: underline !important;
  }

  .logo {
    height: 100px;
  }
}
</style>
