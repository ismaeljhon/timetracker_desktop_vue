<template>
  <q-page class="q-pa-md">
    <FormComponent />
    <TimerComponent />
    <TimelogSummary />
    <p class="q-mt-sm text-center text-grey-6">Timezone: Edmonton, AB, Canada (GMT-7)</p>

    <q-btn label="Take Screenshot" color="primary" @click="captureScreenshot" v-show="false" />
    <div v-if="imagePath" class="q-mt-md">
      <p>Screenshot saved to: {{ imagePath }}</p>
      <img :src="imagePath" alt="Screenshot" style="max-width: 100%" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TimerComponent from '../components/partials/TimerComponent.vue';
import TimelogSummary from '../components/partials/TimelogSummary.vue';
import FormComponent from 'src/components/partials/FormComponent.vue';

const imagePath = ref<string | null>(null);

const captureScreenshot = async () => {
  imagePath.value = await window.electronAPI.takeScreenshot();
};
</script>
