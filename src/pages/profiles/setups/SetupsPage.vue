<template>
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
    <ProfileItemCard
      v-for="(profile, index) in profileList"
      :key="index"
      :profile="profile"
    >
      <ItemEditBtn
        ref="itemEditBtnRefs"
        @edit="edit(profile)"
        @duplicate="duplicate(profile, index)"
        @remove="remove(profile)"
      />
    </ProfileItemCard>
    <div
      v-if="profileList.length === 0"
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
import ProfileItemCard from 'src/components/profiles/setups/SetupItemCard.vue'
import { useProfileStore } from 'src/stores/profiles/setup'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ItemEditBtn from 'src/components/setup/itemEditBtn.vue'

const profileStore = useProfileStore()

const search = ref('')
const profileList = computed(() => {
  return profileStore.filterProfile(search.value)
})

const router = useRouter()
const edit = function (profile) {
  router.push(`/setup/profiles/edit/${profile.id}`)
}

const itemEditBtnRefs = ref([])
const duplicate = function (profile, index) {
  profileStore.duplicateProfile(profile.id)

  const itemEditBtn = itemEditBtnRefs.value[index]
  itemEditBtn.dialogClose()
}

const remove = function (profile) {
  profileStore.removeProfile(profile.id)
}

</script>
