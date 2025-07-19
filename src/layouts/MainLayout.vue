<script setup lang="ts">
import ProfileComponent from 'src/components/ProfileComponent.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="text-subtitle1">Bickert Management Timetracker</q-toolbar-title>
        <ProfileComponent />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
body {
  overflow-y: hidden;
}
</style>
