import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import DraftListView from '@/views/DraftListView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/draft-list',
      name: 'draft-list',
      component: DraftListView
    }
  ]
})

export default router
