import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import "@/assets/global.css"
import routes from './routes'

import VueClosable from 'vue-closable'
import VueSnap from 'vue-snap'
import 'vue-snap/dist/vue-snap.css'
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css'

const app = createApp({})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: MainLayout,
      children: routes
    }
  ]
})

app.use(router)
app.use(VueClosable)
app.use(VueSnap)

app.mount('#app')
