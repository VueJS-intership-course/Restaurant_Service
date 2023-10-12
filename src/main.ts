import { createApp } from "vue";
import "./styles/style.scss";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'; 
import {usersStore} from './store/usersStore'
import firebaseData from "./services/firebaseConfig";

const pinia = createPinia();

const app = createApp(App);


app.use(pinia);
const store = usersStore()
firebaseData.fireAuth.onAuthStateChanged((user) => {
    if (user) {
      store.setCurrentUser(user)
    } else {
      store.setCurrentUser(null)
    }
  });
app.use(router);

app.mount("#app");
