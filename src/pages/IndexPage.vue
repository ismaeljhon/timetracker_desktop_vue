<template>
  <q-page class="q-pa-md">
    <q-btn label="Take Screenshot" color="primary" @click="captureScreenshot" />
    <div v-if="imagePath" class="q-mt-md">
      <p>Screenshot saved to: {{ imagePath }}</p>
      <img :src="imagePath" alt="Screenshot" style="max-width: 100%;" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imagePath = ref<string | null>(null)

const captureScreenshot = async () => {
  imagePath.value = await window.electronAPI.takeScreenshot()
}
</script>
