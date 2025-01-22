import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const app = createApp(App)
app.use(autoAnimatePlugin);
const routes = [
  {path: '/', component: () => import('./pages/Home.vue')},
  {path: '/product/:id', component: () => import('./pages/Product.vue'), props: true},
  {path: '/checkout', component: () => import('./pages/Checkout.vue')},
  {path: '/success', component: () => import('./pages/Success.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(createPinia())
app.use(router).mount('#app')
