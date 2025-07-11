<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="text-subtitle1">Bickert Management Timetracker</q-toolbar-title>
        <q-btn-dropdown stretch flat dropdown-icon="settings">
          <q-list>
            <q-item clickable v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="screenshot_monitor" square text-color="grey-7" size="40px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Take screenshot</q-item-label>
              </q-item-section>
            </q-item>
            <!-- <q-separator /> -->
            <q-item clickable v-close-popup tabindex="1">
              <q-item-section avatar>
                <q-avatar icon="lock" square text-color="grey-7" size="40px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Access keys</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced />
            <q-item clickable v-close-popup tabindex="2">
              <q-item-section avatar>
                <q-avatar icon="logout" square text-color="grey-7" size="40px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Sign out</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
