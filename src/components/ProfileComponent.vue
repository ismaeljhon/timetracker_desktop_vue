<script lang="ts" setup>
import { CurrentUser } from 'app/src-electron/types/auth.type';
import { useScreenshotStore } from 'src/stores/screenshot';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const screenshot = useScreenshotStore();
const currentUser = ref<CurrentUser>();

const router = useRouter();
async function signOut() {
  window.authApi.signOut().catch((e) => console.log(e));

  await router.push({ path: '/login' });
}

onMounted(async () => {
  currentUser.value = await window.authApi.getCurrentUser();
});
</script>
<template>
  <q-btn-dropdown stretch flat dropdown-icon="settings">
    <q-list>
      <q-item-label header>Howdy, {{ currentUser?.name }}</q-item-label>
      <q-item clickable v-close-popup tabindex="0" @click="screenshot.takeScreenshot()">
        <q-item-section avatar>
          <q-avatar icon="screenshot_monitor" square text-color="grey-7" size="40px" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Take screenshot</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced />
      <q-item clickable v-close-popup tabindex="2" @click="signOut">
        <q-item-section avatar>
          <q-avatar icon="logout" square text-color="grey-7" size="40px" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Sign out</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
