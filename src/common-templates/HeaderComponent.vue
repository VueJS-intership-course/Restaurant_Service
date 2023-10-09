<template>
    <nav>
        <ul>
            <li>
                <img src="../assets/logo.png" class="logo" />
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
@import '../styles/_variables.scss';
nav {
    display: flex;
    background-color:$light-green;

    ul {
        list-style: none;

        .logo {
            height: 100px;
        }
    }
}
</style>