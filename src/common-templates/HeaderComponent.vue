<template>
  <nav>
      <div>
          <img src="../assets/logo-full.png" class="logo" />
      </div>
      <ul>
        <li>
          <span>Login</span>
        </li>
        <li>
          <span>About Us</span>
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
    align-items: center;
    gap: 10px;
    list-style: none;
    margin-left: auto;
    padding-right: 30px;
  }

  .logo {
    height: 100px;
  }
}
</style>
