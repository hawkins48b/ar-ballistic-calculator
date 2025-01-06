<template>
  <q-page class="q-pa-md">
    <PageHeader back>
      <q-btn
        icon="add"
        class="desktop-only"
        color="primary"
        to="/profiles/setups/add"
      >
        Add
      </q-btn>
    </PageHeader>
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
    <SetupItemCard
      v-for="(setup, index) in setupList"
      :key="index"
      :setup="setup"
    >
      <ItemEditBtn
        ref="itemEditBtnRefs"
        @edit="edit(setup)"
        @duplicate="duplicate(setup, index)"
        @remove="remove(setup, index)"
      />
    </SetupItemCard>
    <div
      v-if="setupList.length === 0"
      class="q-mt-md"
    >
      No result found.
    </div>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        to="/profiles/setups/add"
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
import SetupItemCard from 'src/components/profiles/setup/SetupItemCard.vue'
import { useSetupStore } from 'src/stores/profiles/setup'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ItemEditBtn from 'src/components/profiles/itemEditBtn.vue'

const setupStore = useSetupStore()

const search = ref('')
const setupList = computed(() => {
  return setupStore.filterSetup(search.value)
})

const router = useRouter()
const edit = function (setup) {
  router.push(`/profiles/setups/edit/${setup.id}`)
}

const itemEditBtnRefs = ref([])
const duplicate = function (setup, index) {
  setupStore.duplicateSetup(setup.id)

  const itemEditBtn = itemEditBtnRefs.value[index]
  itemEditBtn.dialogClose()
}

const remove = function (setup, index) {
  setupStore.removeSetup(setup.id)

  const itemEditBtn = itemEditBtnRefs.value[index]
  itemEditBtn.dialogClose()
}

</script>
