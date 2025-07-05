<template>
  <q-page class="q-pa-md">
    <CardSelection title="Project" value="Keffi design system" />
    <CardSelection title="Task" value="Keffi design system" />
    <CardSelection title="Notes" value="Keffi design system" icon="content_paste" />
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
import TimerComponent from 'src/components/TimerComponent.vue';
import CardSelection from '../components/CardSelection.vue';
import { ref } from 'vue';
import TimelogSummary from 'src/components/TimelogSummary.vue';

const imagePath = ref<string | null>(null);

const captureScreenshot = async () => {
  imagePath.value = await window.electronAPI.takeScreenshot();
};
</script>
