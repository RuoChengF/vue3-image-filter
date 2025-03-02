import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "@/styles/index.scss"; // global css

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
