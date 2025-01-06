<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Profiles
      </div>
      <ExportProfilesBtn
        class="q-mt-md"
      />
      <ImportProfiles
        class="q-mt-md"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import ExportProfilesBtn from './ExportProfilesBtn.vue'
import ImportProfiles from './ImportProfiles.vue'
</script>
