import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./assets/css/index.css";

createApp(App).use(createPinia()).mount("#app");
