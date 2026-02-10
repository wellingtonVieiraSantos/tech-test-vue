import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import GalleryView from '../views/GalleryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        title: 'Painel de Controle'
      }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView,
      meta: {
        title: 'Galeria'
      }
    },

  ]
})

export default router
