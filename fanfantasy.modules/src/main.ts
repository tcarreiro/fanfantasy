import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import router from './router'
import App from './App.vue'
import i18n from './i18n/i18n'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(pinia)
  .use(router)
  .use(i18n)
  .mount('#app')
