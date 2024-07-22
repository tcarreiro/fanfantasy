import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type Envs = 'dev'|'local'|'prod';

export type AppState = {
  basePath:string;
  fanfantasyApiUrl: string;
  token: string;
  enviroment: Envs;
}

export const useApp = defineStore('fanfantasy-module-app-state', {
  state: (): AppState => ({
    basePath: "",
    fanfantasyApiUrl: "http://localhost:8080",
    token: "",
    enviroment: "local"
  }),
  actions: {
    setupApp(newState:AppState) {
      this.$state = newState ?? this.basePath
    },
    setToken(token:string) {
      if (token) {
        this.$state.token = token;
      }
    }
  },
  getters:{}
})

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
