<template>
  <PageHeader back-to="/profilesv2">
    <q-btn
      icon="add"
      class="desktop-only"
      color="primary"
      to="/profilesv2/optics/add"
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
    <div
      v-for="optic in opticList"
      :key="optic.id"
    >
      <OpticItem
        :optic="optic"
      />
    </div>
    <div
      v-if="opticList.length === 0"
      class="q-mt-md"
    >
      No result found.
    </div>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        to="/profilesv2/optics/add"
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
import OpticItem from 'src/components/profiles/optic/OpticItem.vue'
import { useOpticStore } from 'src/stores/profiles/optic'
import { ref, computed } from 'vue'

const opticStore = useOpticStore()

const search = ref('')
const opticList = computed(() => {
  return opticStore.filterOptic(search.value)
})

</script>
