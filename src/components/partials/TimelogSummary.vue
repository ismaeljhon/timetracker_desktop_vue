<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import LatestScreenshot from './LatestScreenshot.vue';
import type { ZohoTimesheet } from 'src/types/zoho-rest.type';

const timelogSummary = ref<{
  weeklyTimesheet: ZohoTimesheet;
  dailyTimesheet: ZohoTimesheet;
}>();

const weeklyHours = computed(() => timelogSummary.value?.weeklyTimesheet?.grandtotal || '00:00');
const dailyHours = computed(() => timelogSummary.value?.dailyTimesheet?.grandtotal || '00:00');
onMounted(async () => {
  timelogSummary.value = await window.electronAPI.getTimelogSummary();
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
