<template>
  <q-page class="q-pa-md">
    <FormComponent />
    <TimerComponent />
    <TimelogSummary />
    <p class="q-mt-sm text-center text-grey-6">Timezone: Edmonton, AB, Canada (GMT-7)</p>
  </q-page>
</template>

<script lang="ts" setup>
import TimerComponent from '../components/partials/TimerComponent.vue';
import TimelogSummary from '../components/partials/TimelogSummary.vue';
import FormComponent from 'src/components/partials/FormComponent.vue';
</script>
