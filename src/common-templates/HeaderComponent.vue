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
        <RouterLink :to="'/about'" class="navbar-link">
          <span>About Us</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@import '../styles/_variables.scss';
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
          color: #79E59B;
        }
      }
    }
  }

  .logo {
    height: 100px;
  }
}
</style>
