<script setup lang="ts">
import { type QSelect, type QSelectProps } from 'quasar';
import { useTimetrackerStore } from 'src/stores/timetracker';
import type { Project, ProjectSubTask, ProjectTask } from 'src/types/zoho-rest.type';
import type { Ref } from 'vue';
import { computed, onMounted, ref, unref, watch } from 'vue';

const timertrackerStore = useTimetrackerStore();
const projectSelectedId = ref<number | string>();
const projectTaskSelectedId = ref<number | string>();
const subTaskSelectedId = ref<number | string>();
const notes = ref('');
const projectsOption = ref<QSelectProps['options']>([]);
const defaultProjectsOptions = ref<QSelectProps['options']>([]);
const isLoadingProjects = ref(false);
const projectTasksOption = ref<QSelectProps['options']>([]);
const defaultProjectTasksOptions = ref<QSelectProps['options']>([]);
const isLoadingProjectTasks = ref(false);
const subTasksOption = ref<QSelectProps['options']>([]);
const defaultSubTasksOptions = ref<QSelectProps['options']>([]);
const isLoadingSubTasks = ref(false);

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

function subTasksFilterFn(
  val: string,
  update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
) {
  if (val === '') {
    update(() => {
      subTasksOption.value = defaultSubTasksOptions.value;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    subTasksOption.value = defaultSubTasksOptions.value?.filter(
      (v: QSelectProps['modelValue']) => v.label.toLowerCase().indexOf(needle) > -1,
    );
  });
}

function updateProjectModel(projectId: Ref) {
  // clear tasks
  projectTaskSelectedId.value = '';
  timertrackerStore.setProjectSelected(projectId?.value);

  fetchProjectTasks(projectId).catch(() => console.error('Error on fetching project task'));
}

function updateProjectTaskModel(projectTaskId: Ref) {
  subTaskSelectedId.value = '';
  timertrackerStore.setProjectTaskSelected(projectTaskId?.value);

  fetchSubTasks(projectTaskId).catch(() => console.error('Error on fetching subtask'));
}

function updateSubTaskModel(subTaskId: Ref) {
  timertrackerStore.setProjectTaskSelected(subTaskId?.value);
}

async function fetchProjects() {
  isLoadingProjects.value = true;
  projectsOption.value = await window.electronAPI
    .getProjects()
    .then((projects: Project[]) =>
      projects.map((project) => ({ label: project.name, value: project.id_string })),
    )
    .finally(() => {
      isLoadingProjects.value = false;
    });

  defaultProjectsOptions.value = unref(projectsOption.value);
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
    )
    .finally(() => {
      isLoadingProjectTasks.value = false;
    });

  defaultProjectTasksOptions.value = unref(projectTasksOption.value);
}

async function fetchSubTasks(taskId: Ref) {
  const projectId = timertrackerStore.projectSelectedId;
  if (!taskId) {
    return;
  }

  subTasksOption.value = [];
  defaultSubTasksOptions.value = [];

  isLoadingSubTasks.value = true;
  subTasksOption.value = await window.electronAPI
    .getSubTasks(projectId, taskId.value)
    .then((tasks: ProjectSubTask[]) =>
      tasks.map((task) => ({ label: task.name, value: task.id_string })),
    )
    .finally(() => {
      isLoadingSubTasks.value = false;
    });

  defaultSubTasksOptions.value = unref(subTasksOption.value);
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

const disableSubTasksOptions = computed(() => {
  if (isLoadingSubTasks.value || isLoadingProjectTasks.value || isLoadingProjects.value) {
    return true;
  }

  if (!projectSelectedId.value || !projectTaskSelectedId.value) {
    return true;
  }

  return false;
});

watch(notes, (val) => timertrackerStore.setNotes(val));

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
    @update:model-value="updateProjectModel"
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
    :loading="isLoadingProjectTasks"
    :disable="disableProjectTasksOptions"
    label="Task"
    class="q-mb-sm"
    @filter="projectTasksFilterFn"
    @update:model-value="updateProjectTaskModel"
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

  <q-select
    clearable
    outlined
    v-model="subTaskSelectedId"
    :options="subTasksOption"
    use-input
    input-debounce="0"
    :loading="isLoadingSubTasks"
    :disable="disableSubTasksOptions"
    label="Sub-Task"
    class="q-mb-sm"
    @filter="subTasksFilterFn"
    @update:model-value="updateSubTaskModel"
  >
    <template v-slot:prepend>
      <q-icon name="line_style" />
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
