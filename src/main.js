import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './components';
import pinia from './components/Stores';
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');

