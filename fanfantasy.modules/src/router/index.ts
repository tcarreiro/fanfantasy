import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import StandingsView from '@/views/StandingsView.vue';
import DraftListView from '@/views/DraftListView.vue';
import FlatIconView from '@/views/FlatIconView.vue';

export type View = {
  path: string,
  name: string,
  component: string,
  showOnNavBar: boolean,
  index: number
}

export const pageViews:View[] = [
  {
    name: 'home',
    path: '/',
    component: HomeView,
    showOnNavBar: true,
    index: 0
  },
  {
    name: 'standings',
    path: '/standings',
    component: StandingsView,
    showOnNavBar: true,
    index: 1
  },
  {
    name: 'draft-list',
    path: '/draft-list',
    component: DraftListView,
    showOnNavBar: true,
    index: 2
  },
  {
    name: 'flaticons',
    path: '/flaticons',
    component: FlatIconView,
    showOnNavBar: false,
    index: 3
  }
]

const routes: RouteRecordRaw[] = pageViews.map(view => ({
  name: view.name,
  path: view.path,
  component: view.component
}));

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
