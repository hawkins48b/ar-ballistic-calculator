<template>
  <div>
    <ProfileSelectorSelect
      class="q-mb-md"
    />
    <q-expansion-item
      expand-separator
      label="Search"
      caption="Trouble finding a profile ? Use the search"
      classe="q-mt-md"
      icon="search"
    >
      <ProfileSelectorTable />
    </q-expansion-item>
  </div>
</template>

<script setup>
import ProfileSelectorTable from 'components/profiles/selector/ProfileSelectorTable.vue'
import ProfileSelectorSelect from 'components/profiles/selector/ProfileSelectorSelect.vue'
</script>
