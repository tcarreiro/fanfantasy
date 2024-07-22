import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import DraftListView from '@/views/DraftListView.vue';
import { REPOSITORY_NAME } from '@/utils/constants';

const basePath = import.meta.env.MODE === '/development' ? REPOSITORY_NAME : "";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:  basePath + '/',
      name: 'home',
      component: HomeView
    },
    {
      path: basePath + '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: basePath + '/draft-list',
      name: 'draft-list',
      component: DraftListView
    }
  ]
})

export default router
