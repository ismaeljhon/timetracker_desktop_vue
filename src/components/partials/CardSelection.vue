<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    value: string;
    icon?: string;
    className?: string;
  }>(),
  {
    icon: 'folder',
  },
);
</script>
<template>
  <q-card :class="className" class="q-mb-sm card-selection" flat bordered square>
    <q-card-section horizontal>
      <q-item>
        <q-item-section>
          <q-item-label class="text-grey-8"
            ><q-icon :name="icon" class="q-mr-xs" /> {{ title }}</q-item-label
          >
          <q-item-label caption lines="2" class="text-grey-9">{{ value }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>
<style>
.card-selection {
  cursor: pointer;
}
</style>
