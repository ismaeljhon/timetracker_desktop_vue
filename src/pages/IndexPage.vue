<template>
  <q-page class="q-pa-md">
    <q-select
      outlined
      v-model="projectSelectedId"
      :options="options"
      label="Project"
      class="q-mb-sm"
    >
      <template v-slot:prepend>
        <q-icon name="folder_copy" />
      </template>
    </q-select>
    <q-select
      outlined
      v-model="projectTaskSelectedId"
      :options="options"
      label="Task"
      class="q-mb-sm"
    >
      <template v-slot:prepend>
        <q-icon name="format_list_bulleted" />
      </template>
    </q-select>

    <q-input
      outlined
      v-model="notes"
      label="Notes"
      stack-label
      placeholder="What are you working on?"
    >
      <template v-slot:prepend>
        <q-icon name="auto_awesome" />
      </template>
    </q-input>
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

const imagePath = ref<string | null>(null);

const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
const projectSelectedId = ref<number | string>();
const projectTaskSelectedId = ref<number | string>();
const notes = ref('');

const captureScreenshot = async () => {
  imagePath.value = await window.electronAPI.takeScreenshot();
};
</script>
