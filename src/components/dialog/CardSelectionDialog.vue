<script lang="ts" setup>
import { ref } from 'vue';

const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];

const prompt = ref(false);
const model = ref();
const options = ref(stringOptions);

/* eslint-disable @typescript-eslint/no-explicit-any */
const filterFn = (val: string, update: any) => {
  if (val === '') {
    update(() => {
      options.value = stringOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter((v) => v.toLowerCase().indexOf(needle) > -1);
  });
};
defineProps<{
  title: string;
}>();
</script>
<template>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-pa-md">
          <div class="q-gutter-md row">
            <q-select
              filled
              v-model="model"
              label="Simple select"
              :options="stringOptions"
              style="width: 250px"
              behavior="menu"
            />

            <q-select
              filled
              v-model="model"
              use-input
              input-debounce="0"
              label="Simple filter"
              :options="options"
              @filter="filterFn"
              style="width: 250px"
              behavior="menu"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No results </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Proceed" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
