<template>
  <q-card
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md"
  >
    <p class="text-h6">
      Profile
    </p>
    <ProfileSelector />
  </q-card>
</template>

<script setup>
// imports
import ProfileSelector from 'components/profiles/ProfileSelector.vue'
</script>
