<script setup lang="ts">
import { pad } from 'src/shared/utils';
import { useTimerStore } from 'src/stores/timer';
import { computed } from 'vue';

const timerStore = useTimerStore();

const processTimer = () => {
  if (!timerStore.isTimerRunning) {
    timerStore.startTimer();
    return;
  }

  console.log(formattedTime.value);
  timerStore.stopTimer();
};

const formattedTime = computed(() => {
  const hours = Math.floor(timerStore.totalSeconds / 3600);
  const minutes = Math.floor((timerStore.totalSeconds % 3600) / 60);
  const seconds = timerStore.totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
});

const timerButtonLabel = computed(() => (timerStore.isTimerRunning ? 'Stop' : 'Start'));
const timerButtonIcon = computed(() => (timerStore.isTimerRunning ? 'stop' : 'play_arrow'));
</script>
<template>
  <q-item class="time-component q-pa-none q-pl-md">
    <q-item-section>
      <q-item-label>&nbsp;</q-item-label>
      <q-item-label caption lines="2">
        <p class="text-h3 text-grey-9">{{ formattedTime }}</p>
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label
        ><q-btn
          :icon="timerButtonIcon"
          :label="timerButtonLabel"
          color="primary"
          :class="{
            'lighter-button': timerStore.isTimerRunning,
          }"
          @click="processTimer"
      /></q-item-label>
    </q-item-section>
  </q-item>
</template>
<style>
.timer-component h4 {
  margin: 0;
  line-height: 1em;
}
.lighter-button {
  background-color: rgba(127, 21, 24, 0.6) !important;
}
</style>
