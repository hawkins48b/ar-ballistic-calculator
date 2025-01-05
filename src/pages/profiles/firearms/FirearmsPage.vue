<template>
  <q-page class="q-pa-md">
    <PageHeader back>
      <q-btn
        icon="add"
        class="desktop-only"
        color="primary"
        to="/profiles/firearms/add"
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
    <FirearmItemCard
      v-for="(firearm, index) in firearmList"
      :key="index"
      :firearm="firearm"
    >
      <ItemEditBtn
        ref="itemEditBtnRefs"
        @edit="edit(firearm)"
        @duplicate="duplicate(firearm, index)"
        @remove="remove(firearm)"
      />
    </FirearmItemCard>
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
        to="/profiles/firearms/add"
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
import FirearmItemCard from 'components/profiles/firearm/FirearmItemCard.vue'
import { useFirearmStore } from 'src/stores/profiles/firearm'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ItemEditBtn from 'src/components/profiles/itemEditBtn.vue'

const firearmStore = useFirearmStore()

const search = ref('')
const firearmList = computed(() => {
  return firearmStore.filterFirearmList(search.value)
})

const router = useRouter()
const edit = function (firearm) {
  router.push(`/profiles/firearms/edit/${firearm.id}`)
}

const itemEditBtnRefs = ref([])
const duplicate = function (firearm, index) {
  firearmStore.duplicateFirearm(firearm.id)

  const itemEditBtn = itemEditBtnRefs.value[index]
  itemEditBtn.dialogClose()
}

const remove = function (firearm) {
  firearmStore.removeFirearm(firearm.id)
}

</script>
