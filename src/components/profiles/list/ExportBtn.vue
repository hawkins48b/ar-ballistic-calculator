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
        class="row"
      >
        <div class="col-12">
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
        <div
          class="col-12 q-mt-md"
        >
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
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'
import { useQuasar } from 'quasar'

const dialog = ref(false)
const $q = useQuasar()

const date = new Date()
const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
// format filename with year.month.day.profiles.json
const filename = `${formattedDate}.profiles.json`

const prefix = ref(`exported ${formattedDate}`)

// list profiles
const profilesStore = useProfilesStore()

// Add prefix to each rifle name
function prefixRifleNames (profilesArray) {
  if (prefix.value !== '') {
    return profilesArray.map((item) => ({
      ...item,
      weapon: {
        ...item.weapon,
        name: `${prefix.value} ${item.weapon.name}`
      }
    }))
  } else {
    return profilesArray
  }
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

  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

async function shareJson (profilesArray) {
  // Convert the array to JSON
  const jsonString = JSON.stringify(profilesArray, null, 2)

  // Save the JSON file
  const result = await Filesystem.writeFile({
    path: filename,
    data: jsonString,
    directory: Directory.Cache,
    encoding: Encoding.UTF8
  })

  // Share the file
  try {
    await Share.share({
      title: 'ZRO Ballistic app - Exported Profiles',
      text: 'Here is the exported Profiles for another ZRO ballistic app.',
      url: result.uri, // Use the file's URI
      dialogTitle: 'Share exported Profiles'
    })
  } catch {
    // nothing
  }
}

async function exportProfiles () {
  const profilesArray = ref(profilesStore.profilesArray)
  profilesArray.value = sanitizedProfiles(profilesArray.value)
  profilesArray.value = prefixRifleNames(profilesArray.value)

  if ($q.platform.is.mobile) {
    await shareJson(profilesArray.value)
  } else {
    downloadJson(profilesArray.value)
  }
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
  for (const profile of uploadedProfiles.value) {
    profilesStore.addProfile(profile)
  }
}

</script>
