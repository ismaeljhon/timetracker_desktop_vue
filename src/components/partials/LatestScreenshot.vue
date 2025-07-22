<script lang="ts" setup>
import { useScreenshotStore } from 'src/stores/screenshot';
import { onMounted } from 'vue';

const screenshot = useScreenshotStore();

onMounted(() => {
  screenshot.fetchLatestScreenshot().catch((e) => console.error(e));
});
</script>
<template>
  <q-img class="col-7" :src="screenshot.latestScreenshot" />
</template>
