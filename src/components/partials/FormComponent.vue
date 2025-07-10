<script setup lang="ts">
import type { QSelect, QSelectProps } from 'quasar';
import type { Project, ProjectTask } from 'src/types/zoho-rest.type';
import type { Ref } from 'vue';
import { computed, onMounted, ref, unref } from 'vue';

const projectSelectedId = ref<number | string>();
const projectTaskSelectedId = ref<number | string>();
const notes = ref('');
const projectsOption = ref<QSelectProps['options']>([]);
const defaultProjectsOptions = ref<QSelectProps['options']>([]);
const isLoadingProjects = ref(false);
const projectTasksOption = ref<QSelectProps['options']>([]);
const defaultProjectTasksOptions = ref<QSelectProps['options']>([]);
const isLoadingProjectTasks = ref(false);

function projectsFilterFn(
  val: string,
  update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
) {
  if (val === '') {
    update(() => {
      projectsOption.value = defaultProjectsOptions.value;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    projectsOption.value = defaultProjectsOptions.value?.filter(
      (v: QSelectProps['modelValue']) => v.label.toLowerCase().indexOf(needle) > -1,
    );
  });
}

function projectTasksFilterFn(
  val: string,
  update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
) {
  if (val === '') {
    update(() => {
      projectTasksOption.value = defaultProjectTasksOptions.value;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    projectTasksOption.value = defaultProjectTasksOptions.value?.filter(
      (v: QSelectProps['modelValue']) => v.label.toLowerCase().indexOf(needle) > -1,
    );
  });
}

async function fetchProjects() {
  isLoadingProjects.value = true;
  projectsOption.value = await window.electronAPI
    .getProjects()
    .then((projects: Project[]) =>
      projects.map((project) => ({ label: project.name, value: project.id_string })),
    );

  defaultProjectsOptions.value = unref(projectsOption.value);
  isLoadingProjects.value = false;
}

async function fetchProjectTasks(projectId: Ref) {
  if (!projectId) {
    return;
  }
  projectTasksOption.value = [];
  defaultProjectTasksOptions.value = [];

  isLoadingProjectTasks.value = true;
  projectTasksOption.value = await window.electronAPI
    .getProjectTasks(projectId.value)
    .then((tasks: ProjectTask[]) =>
      tasks.map((task) => ({ label: task.name, value: task.id_string })),
    );

  defaultProjectTasksOptions.value = unref(projectTasksOption.value);
  isLoadingProjectTasks.value = false;
}
const disableProjectTasksOptions = computed(() => {
  if (isLoadingProjectTasks.value || isLoadingProjects.value) {
    return true;
  }

  if (!projectSelectedId.value) {
    return true;
  }

  return false;
});

onMounted(async () => {
  await fetchProjects();
});
</script>

<template>
  <q-select
    clearable
    outlined
    v-model="projectSelectedId"
    :options="projectsOption"
    use-input
    input-debounce="0"
    :loading="isLoadingProjects"
    :disable="isLoadingProjects"
    label="Project"
    class="q-mb-sm"
    @filter="projectsFilterFn"
    @update:model-value="fetchProjectTasks"
  >
    <template v-slot:prepend>
      <q-icon name="folder_copy" />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
  <q-select
    clearable
    outlined
    v-model="projectTaskSelectedId"
    :options="projectTasksOption"
    use-input
    input-debounce="0"
    :loading="isLoadingProjectTasks || isLoadingProjects"
    :disable="disableProjectTasksOptions"
    label="Task"
    class="q-mb-sm"
    @filter="projectTasksFilterFn"
  >
    <template v-slot:prepend>
      <q-icon name="format_list_bulleted" />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>

  <q-input
    outlined
    v-model="notes"
    label="Notes"
    stack-label
    placeholder="What are you working on?"
  >
    <template v-slot:prepend>
      <q-icon name="auto_awesome" />
    </template>
  </q-input>
</template>
