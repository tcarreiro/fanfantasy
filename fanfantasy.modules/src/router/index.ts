import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import DraftListView from '@/views/DraftListView.vue';
import { REPOSITORY_NAME } from '@/utils/constants';

export const appBasePath = import.meta.env.MODE === '/development' ? REPOSITORY_NAME : "";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:  appBasePath + '/',
      name: 'home',
      component: HomeView
    },
    {
      path: appBasePath + '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: appBasePath + '/draft-list',
      name: 'draft-list',
      component: DraftListView
    }
  ]
})

export default router
