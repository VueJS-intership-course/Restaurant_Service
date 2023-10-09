<template>
  <nav>
      <div>
          <img src="../assets/logo-full.png" class="logo" />
      </div>
      <ul>
        <li>
          <p>Login</p>
        </li>
        <li>
          <p>About Us</p>
        </li>
      </ul>
  </nav>
</template>

<style scoped lang="scss">
@import "../styles/_variables.scss";
nav {
  display: flex;
  background-color: $green;
  width: 100%;

  ul {
    display: flex;
    list-style: none;
    margin-left: auto;
  }

  .logo {
    height: 100px;
  }
}
</style>
