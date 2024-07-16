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
    },
    {
      path: "/text",
      name: "text",
      component: () => import("../views/SimpleText.vue")
    },
    {
      path: "/email",
      name: "email",
      component: () => import("../views/EmailView.vue")
    },
    {
      path: "/sms",
      name: "sms",
      component: () => import("../views/SmsView.vue")
    },
    {
      path: "/lecture",
      name: "lecture",
      component: () => import("../views/LectureView.vue")
    }
  ]
})

export default router
