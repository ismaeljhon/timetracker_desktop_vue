<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="bg-grey-2">
      <q-page class="flex flex-center">
        <q-card class="q-pa-lg shadow-2 rounded-borders" style="width: 400px; max-width: 90vw">
          <q-card-section>
            <div class="text-subtitle1 text-center">Timetracker Login</div>
          </q-card-section>

          <q-card-section>
            <q-form ref="loginForm">
              <q-input
                v-model="email"
                label="Email"
                type="email"
                class="text-subtitle1"
                hint="Use your zoho email here"
                outlined
                :rules="[
                  (val) => !!val || 'Email is required',
                  (val) => /.+@.+\..+/.test(val) || 'Enter a valid email',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
            </q-form>
            <q-btn
              label="Start Working"
              color="primary"
              class="full-width q-mt-sm"
              @click="onSubmit"
            />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import type { PortalUser } from 'src/types/zoho-rest.type';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref();
const loginForm = ref();

const onSubmit = async () => {
  const valid = await loginForm.value?.validate();

  if (!valid) return;

  const portalUsers = await window.electronAPI
    .getPortalUsers({ fetchFromApi: true })
    .catch(() => console.error('Error FE: fetching portal users'));

  const currentUser = portalUsers?.find(
    (portalUser: PortalUser) => portalUser.email == email.value,
  );

  if (currentUser) {
    await window.authApi
      .setCurrentUser(currentUser)
      .catch(() => console.log('Error FE: on setting up current user'));

    router.push({ path: '/' }).catch((e) => console.log(e));
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
