<template>
  <PageHeader back-to="/profilesv2">
    <q-btn
      icon="add"
      class="desktop-only"
      color="primary"
      to="/profilesv2/ammunition/add"
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
    <AmmunitionItem
      v-for="ammunition in ammunitionList"
      :key="ammunition.id"
      :ammunition="ammunition"
    />
    <div
      v-if="ammunitionList.length === 0"
      class="q-mt-md"
    >
      No result found.
    </div>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        to="/profilesv2/ammunition/add"
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
import AmmunitionItem from 'components/profiles/ammunition/AmmunitionItem.vue'
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'
import { ref, computed } from 'vue'

const ammunitionStore = useAmmunitionStore()

const search = ref('')
const ammunitionList = computed(() => {
  return ammunitionStore.filterAmmunition(search.value)
})

</script>
