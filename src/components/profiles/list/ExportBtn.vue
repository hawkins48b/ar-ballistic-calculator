<template>
  <div>
    <q-btn
      flat
      icon="import_export"
      @click="dialog=true"
    >
      Manage export
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
                Export your profiles for another app or device.
              </p>
              <q-input
                v-model="prefix"
                label="Rifle name prefix"
              />
            </q-card-section>
            <q-card-actions>
              <q-btn
                icon="file_download"
                color="primary"
                @click="exportProfiles"
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
                Insert new profiles within the app.
              </p>
            </q-card-section>
            <q-card-actions>
              <q-file
                v-model="uploadedFile"
                label="Upload file"
                filled
                accept=".json"
                @update:model-value="fileUploaded"
              >
                <template #prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
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

const date = new Date()
const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`

const prefix = ref(`exported ${formattedDate}`)

// list profiles
const profilesStore = useProfilesStore()

// Add prefix to each rifle name
function prefixRifleNames (profilesArray) {
  return profilesArray.map((item) => ({
    ...item,
    weapon: {
      ...item.weapon,
      name: `${prefix.value} ${item.weapon.name}`
    }
  }))
}

// remove id fields from profiles
function sanitizedProfiles (profilesArray) {
  return profilesArray.map(({ id, ...rest }) => rest)
}

function downloadJson (profilesArray) {
  const jsonString = JSON.stringify(profilesArray, null, 2) // Pretty-print with 2 spaces
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url

  // format filename with year.month.day.profiles.json
  const filename = `${formattedDate}.profiles.json`

  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function exportProfiles () {
  const profilesArray = ref(profilesStore.profilesArray)
  profilesArray.value = sanitizedProfiles(profilesArray.value)
  profilesArray.value = prefixRifleNames(profilesArray.value)
  downloadJson(profilesArray.value)
}

const uploadedFile = ref(null) // Holds the selected file
const uploadedProfiles = ref('')
function fileUploaded () {
  if (uploadedFile.value) {
    const fileReader = new FileReader()
    fileReader.onload = function (event) {
      uploadedProfiles.value = JSON.parse(fileReader.result)
      insertProfilesIntoProfilesStore(uploadedProfiles)
      // clear the upload field
      uploadedFile.value = null
      // close dialog
      dialog.value = false
    }
    fileReader.readAsText(uploadedFile.value)
  }
}

function insertProfilesIntoProfilesStore (uploadedProfiles) {
  console.log(uploadedProfiles.value)
  for (const profile of uploadedProfiles.value) {
    profilesStore.addProfile(profile)
  }
}

</script>
