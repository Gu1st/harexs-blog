import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './routers';

// 通用字体
import 'vfonts/Lato.css';
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
