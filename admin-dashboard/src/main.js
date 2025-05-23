import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index.js";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

console.log("[Main] Bootstrapping Vue app");

const app = createApp(App);
console.log("[Main] App instance created");

app.use(createPinia());
console.log("[Main] Pinia plugin added");

app.use(router);
console.log("[Main] Router plugin added");

app.mount("#app");
console.log("[Main] App mounted to #app");
