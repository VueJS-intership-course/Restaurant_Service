import { createApp } from "vue";
import "./styles/style.scss";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'; 

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
