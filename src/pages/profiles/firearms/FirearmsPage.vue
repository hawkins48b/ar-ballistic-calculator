<template>
  <PageHeader back-to="/profilesv2">
    <q-btn
      icon="add"
      class="desktop-only"
      color="primary"
      to="/profilesv2/firearms/add"
    >
      Add
    </q-btn>
  </PageHeader>
  <q-page class="q-pa-md">
    <q-input
      v-model="search"
      label="Search"
      filled
      debounce="500"
    >
      <template #append>
        <q-icon name="search" />
      </template>
    </q-input>
    <FirearmItem
      v-for="firearm in firearmList"
      :key="firearm.id"
      :firearm="firearm"
    />
    <div
      v-if="firearmList.length === 0"
      class="q-mt-md"
    >
      No result found.
    </div>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        to="/profilesv2/firearms/add"
        fab
        icon="add"
        color="primary"
        class="mobile-only"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import FirearmItem from 'components/profiles/firearm/FirearmItem.vue'
import { useFirearmStore } from 'src/stores/profiles/firearm'
import { ref, computed } from 'vue'

const firearmStore = useFirearmStore()

const search = ref('')
const firearmList = computed(() => {
  return firearmStore.filterFirearm(search.value)
})

</script>
