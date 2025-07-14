<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import LatestScreenshot from './LatestScreenshot.vue';
import { useTimetrackerStore } from 'src/stores/timetracker';

const timetrackerStore = useTimetrackerStore();

const weeklyHours = computed(() => timetrackerStore.timelogSummary?.weekly?.grandtotal || '00:00');
const dailyHours = computed(() => timetrackerStore.timelogSummary?.weekly?.grandtotal || '00:00');
onMounted(() => {
  timetrackerStore
    .fetchTimelogSummary()
    .catch(() => console.error('FE: Error on fetching timelog summary'));
});
</script>
<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <LatestScreenshot />
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label caption class="text-grey-8">Today</q-item-label>
            <q-item-label lines="2" class="text-h5 text-weight-regular">{{
              dailyHours
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption class="text-grey-8">This week</q-item-label>
            <q-item-label lines="2" class="text-subtitle1 text-grey-7">{{
              weeklyHours
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
