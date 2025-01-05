<template>
  <q-page class="q-pa-md">
    <PageHeader back>
      <q-btn
        icon="add"
        class="desktop-only"
        color="primary"
        to="/profiles/optics/add"
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
    <OpticItemCard
      v-for="(optic, index) in opticList"
      :key="index"
      :optic="optic"
    >
      <ItemEditBtn
        ref="itemEditBtnRefs"
        @edit="edit(optic)"
        @duplicate="duplicate(optic, index)"
        @remove="remove(optic)"
      />
    </OpticItemCard>
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
        to="/profiles/optics/add"
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
import OpticItemCard from 'src/components/profiles/optic/OpticItemCard.vue'
import { useOpticStore } from 'src/stores/profiles/optic'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ItemEditBtn from 'src/components/profiles/itemEditBtn.vue'

const opticStore = useOpticStore()

const search = ref('')
const opticList = computed(() => {
  return opticStore.filterOpticList(search.value)
})

const router = useRouter()
const edit = function (optic) {
  router.push(`/profiles/optics/edit/${optic.id}`)
}

const itemEditBtnRefs = ref([])
const duplicate = function (optic, index) {
  opticStore.duplicateOptic(optic.id)

  const itemEditBtn = itemEditBtnRefs.value[index]
  itemEditBtn.dialogClose()
}

const remove = function (optic) {
  opticStore.removeOptic(optic.id)
}

</script>
