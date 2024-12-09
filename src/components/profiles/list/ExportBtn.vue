<template>
  <div>
    <q-btn
      flat
      icon="import_export"
      @click="dialog=true"
    >
      manage
    </q-btn>
    <q-dialog
      v-model="dialog"
      flat
    >
      <div
        class="row q-gutter-md"
      >
        <div class="col">
          <q-card
            class="q-pa-md"
            flat
          >
            <q-card-section>
              <div class="text-h2">
                Export
              </div>
              <p class="q-mt-md">
                Export your profiles for another app.
              </p>
            </q-card-section>
            <q-card-actions>
              <q-btn
                icon="file_download"
                color="primary"
                @click="exportAsJson"
              >
                Export
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col">
          <q-card
            class="q-pa-md"
            flat
          >
            <q-card-section>
              <div class="text-h2">
                Import
              </div>
              <p class="q-mt-md">
                Insert within the app new profiles.
              </p>
            </q-card-section>
            <q-card-actions>
              <q-btn
                color="primary"
                icon="file_upload"
              >
                import
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-dialog>
  </div>
</template>
<script setup>

import { ref } from 'vue'
import { useProfilesStore } from 'stores/profiles'

const dialog = ref(false)

// list profiles
const profilesStore = useProfilesStore()

// remove id fields from profiles
const sanitizedProfiles = profilesStore.profilesArray.map(({ id, ...rest }) => rest)

function exportAsJson () {
  const jsonString = JSON.stringify(sanitizedProfiles, null, 2) // Pretty-print with 2 spaces
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url

  // format filename with year.month.day.profiles.json
  const date = new Date()
  const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
  const filename = `${formattedDate}.profiles.json`

  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

</script>
