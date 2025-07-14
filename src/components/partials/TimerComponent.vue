<script setup lang="ts">
import { useTimerStore } from 'src/stores/timer';
import { useTimetrackerStore } from 'src/stores/timetracker';
import { computed } from 'vue';

const timerStore = useTimerStore();
const timetrackerStore = useTimetrackerStore();

const processTimer = async () => {
  if (!timerStore.isTimerRunning) {
    timerStore.startTimer();
    return;
  }

  const time = timerStore.formattedTime.split(':');
  const hours = `${time[0]}:${time[1]}`;
  const notes = timetrackerStore.notes;

  const params = {
    hours,
    notes,
  };

  console.log({
    projectId: timetrackerStore.projectSelectedId,
    taskId: timetrackerStore.projectTaskSelectedId,
    params,
  });
  const electronAPI = window.electronAPI;

  await electronAPI
    .addTimelogPerTask({
      projectId: timetrackerStore.projectSelectedId,
      taskId: timetrackerStore.projectTaskSelectedId,
      params,
    })
    .catch(() => console.log('Error on FE timelog'));

  timerStore.stopTimer();

  timetrackerStore
    .fetchTimelogSummary()
    .catch(() => console.error('FE: Error on fetching timelog summary'));
};

const timerButtonLabel = computed(() => (timerStore.isTimerRunning ? 'Stop' : 'Start'));
const timerButtonIcon = computed(() => (timerStore.isTimerRunning ? 'stop' : 'play_arrow'));
const disableTimer = computed(() => {
  return !timetrackerStore.projectSelectedId || !timetrackerStore.projectTaskSelectedId;
});
</script>
<template>
  <q-item class="time-component q-pa-none q-pl-md">
    <q-item-section>
      <q-item-label>&nbsp;</q-item-label>
      <q-item-label caption lines="2">
        <p class="text-h3 text-grey-9">{{ timerStore.formattedTime }}</p>
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
          :disabled="disableTimer"
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
