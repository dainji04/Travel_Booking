import './assets/main.css';
import './assets/scss/main.scss';
import './axios.js'
import antd from 'ant-design-vue';

import {createApp} from 'vue';
import {createPinia} from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(antd);
app.use(router);

app.mount('#app');
