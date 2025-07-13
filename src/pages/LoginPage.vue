<script lang="ts" setup>
import { ref } from 'vue';

const email = ref('');
</script>
<template>
  <q-input outlined v-model="email">
    <template v-slot:prepend>
      <q-icon name="event" />
    </template>
  </q-input>
</template>
