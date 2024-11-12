import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import StandingsView from '@/views/StandingsView.vue';
import DraftListView from '@/views/DraftListView.vue';
import FlatIconView from '@/views/FlatIconView.vue';
import TeamView from '@/views/TeamView.vue';

export type View = {
  path: string,
  name: string,
  component: any,
  showOnNavBar: boolean,
  index: number,
  subviews: SubView[]
}

export type SubView = {
  index: number,
  path: string,
  name: string,
  component: any,
}

export const pageViews:View[] = [
  {
    name: 'home',
    path: '/',
    component: HomeView,
    showOnNavBar: true,
    index: 0,
    subviews: [
    ]
  },
  {
    name: 'standings',
    path: '/standings',
    component: StandingsView,
    showOnNavBar: true,
    index: 1,
    subviews: [
      {
        index: 0,
        path: "#",
        name: "standings",
        component: StandingsView
      }
    ]
  },
  {
    name: 'draft-list',
    path: '/draft-list',
    component: DraftListView,
    showOnNavBar: true,
    index: 2,
    subviews: [
    ]
  },
  {
    name: 'teams',
    path: '/teams',
    component: TeamView,
    showOnNavBar: true,
    index: 3,
    subviews: [
    ]
  },
  {
    name: 'flaticons',
    path: '/flaticons',
    component: FlatIconView,
    showOnNavBar: false,
    index: 4,
    subviews: [
    ]
  },
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
