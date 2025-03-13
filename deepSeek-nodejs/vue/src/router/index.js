import { createRouter, createWebHistory } from 'vue-router'
import HomeIndex from '../views/homeIndex/homeIndex.vue'
import LoginIndex from "@/views/loginIndex/loginIndex.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeIndex,
    },
    {
      path: '/home',
      component: HomeIndex,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginIndex,
    }
  ],
})

export default router
