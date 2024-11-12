<script setup lang="ts">
import InputField from '@/components/Basic/InputField.vue';
import PrimaryButton from '@/components/Basic/PrimaryButton.vue';
import { generateRandomId } from '@/utils/random';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLoggedUser } from '@/stores/user';

  const username: Ref<string> = ref("");
  const password: Ref<string> = ref("");
  const loggingIn: Ref<boolean> = ref(false);
  const loggingOut: Ref<boolean> = ref(false);

  const userStore = useLoggedUser();
  const loggedUserRef = storeToRefs(userStore);

  const sendLoginCredentials = async () => {
    try {
      loggingIn.value = true;
      userStore.setupLogin(username.value, password.value);
    } catch(e) {
      console.log(e);
    }
    loggingIn.value = false;
  }

  const sendLogoutCredentials = async () => {
    try {
      loggingOut.value = true;
      userStore.setupLogout();
    } catch(e) {
      console.log(e);
    }
    loggingOut.value = false;
  }

</script>

<template>
    <InputField v-if="!loggedUserRef.loggedUser.value" class="mt-2" v-model="username" label="Usuário" :id="generateRandomId()" />
    <InputField v-if="!loggedUserRef.loggedUser.value" class="mt-2" v-model="password" label="Senha" :id="generateRandomId()" type="password" />
    <PrimaryButton v-if="!loggedUserRef.loggedUser.value" class="mt-2" label="Login" :width="100" :disabled="loggingIn" :id="generateRandomId()" @on-click="sendLoginCredentials()" />
    <PrimaryButton v-else class="mt-2" label="Logout" :width="100" :disabled="loggingOut" :id="generateRandomId()" @on-click="sendLogoutCredentials()" />
</template>
