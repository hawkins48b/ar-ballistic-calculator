<template>
  <q-card
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md"
  >
    <ProfileSelector />
  </q-card>
</template>

<script setup>
// imports
import ProfileSelector from 'components/profiles/selector/ProfileSelector.vue'
</script>
