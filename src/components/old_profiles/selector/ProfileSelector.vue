<template>
  <div>
    <ProfileSelectorSelect
      v-model="profileId"
      class="q-mb-md"
    />
    <q-expansion-item
      expand-separator
      label="Search"
      caption="Trouble finding a profile ? Use the search"
      classe="q-mt-md"
      icon="search"
    >
      <ProfileSelectorTable
        v-model="profileId"
      />
    </q-expansion-item>
  </div>
</template>

<script setup>
import ProfileSelectorTable from 'components/profiles/selector/ProfileSelectorTable.vue'
import ProfileSelectorSelect from 'components/profiles/selector/ProfileSelectorSelect.vue'

// eslint-disable-next-line vue/require-prop-types
const profileId = defineModel()
</script>
