import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/url",
      name: "url",
      component: () => import("../views/UrlView.vue")
    },
    {
      path: "/v-card",
      name: "v-card",
      component: () => import("../views/ContactGenView.vue")
    }
  ]
})

export default router
