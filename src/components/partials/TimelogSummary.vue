<script lang="ts" setup>
import LatestScreenshot from './LatestScreenshot.vue';
</script>
<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <LatestScreenshot />
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label caption class="text-grey-8">Today</q-item-label>
            <q-item-label lines="2" class="text-h6 text-weight-regular">08:00:00</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption class="text-grey-8">This week</q-item-label>
            <q-item-label lines="2" class="text-subtitle text-grey-7">08:00:00</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
