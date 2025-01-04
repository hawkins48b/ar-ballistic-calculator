<template>
  <PageHeader back>
    <q-btn
      icon="add"
      class="desktop-only"
      color="primary"
      to="/profiles/ammunitions/add"
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
    <AmmunitionItemCard
      v-for="(ammunition, index) in ammunitionList"
      :key="index"
      :ammunition="ammunition"
    >
      <ItemEditBtn
        ref="itemEditBtnRefs"
        @edit="edit(ammunition)"
        @duplicate="duplicate(ammunition, index)"
        @remove="remove(ammunition)"
      />
    </AmmunitionItemCard>
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
        to="/profiles/ammunitions/add"
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
import AmmunitionItemCard from 'components/profiles/ammunition/AmmunitionItemCard.vue'
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ItemEditBtn from 'src/components/profiles/itemEditBtn.vue'

const ammunitionStore = useAmmunitionStore()

const search = ref('')
const ammunitionList = computed(() => {
  return ammunitionStore.filterAmmunitionList(search.value)
})

const router = useRouter()
const edit = function (ammunition) {
  router.push(`/profiles/ammunitions/edit/${ammunition.id}`)
}

const itemEditBtnRefs = ref([])
const duplicate = function (ammunition, index) {
  ammunitionStore.duplicateAmmunition(ammunition.id)

  const itemEditBtn = itemEditBtnRefs.value[index]
  itemEditBtn.dialogClose()
}

const remove = function (ammunition) {
  ammunitionStore.removeAmmunition(ammunition.id)
}

</script>
