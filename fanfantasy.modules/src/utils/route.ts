import { pageViews } from '@/router';
import { useLeagueState } from '@/stores/app';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export const changeTab = (nth:number):number => {
  const links = document.querySelectorAll('.header-navigation-link');
  links.forEach(link => {
      link.classList.remove('active');
  });
  links[nth].classList.add('active');
  return nth;
}

export const updateCurrentIndex = (path: string) => {
  const {setCurrentViewIndex} = useLeagueState();
  const router = useRouter();
  const pageIndex = pageViews.findIndex(view => view.path === path);
  if (pageIndex !== -1) {
    setCurrentViewIndex(pageIndex);
    changeTab(pageIndex);
  } else {
    console.warn(`Route ${path} not found in pageViews. Redirecting to /home.`);
    router.push('/');
  }
};

export const getTeamPageView = computed(() => {
  return pageViews.filter(view=>view.name==='teams')[0];
})