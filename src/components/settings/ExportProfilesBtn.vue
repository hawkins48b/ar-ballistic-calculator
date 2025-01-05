<template>
  <div>
    <q-btn
      label="Export profiles"
      icon="download"
      color="primary"
      @click="exportProfiles"
    />
    <q-btn
      label="share"
      icon="share"
      outline
      class="mobile-only q-ml-sm"
      @click="shareProfiles"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useSetupStore } from 'stores/profiles/setup'
import { useAmmunitionStore } from 'stores/profiles/ammunition'
import { useFirearmStore } from 'stores/profiles/firearm'
import { useOpticStore } from 'stores/profiles/optic'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'
import { FileOpener } from '@capacitor-community/file-opener'

const $q = useQuasar()

const date = new Date()
const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
const filename = `${formattedDate}.profiles.json`

async function exportProfiles () {
  if ($q.platform.is.mobile) {
    await openProfiles()
  } else {
    downloadProfiles()
  }
}

async function shareProfiles () {
  const jsonString = getProfilesInJson()

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
    $q.notify({
      message: 'Failed to share the exported profiles.',
      color: 'negative',
      position: 'top'
    })
  }
}

async function openProfiles () {
  const jsonString = getProfilesInJson()
  // Save the JSON file
  const result = await Filesystem.writeFile({
    path: filename,
    data: jsonString,
    directory: Directory.Cache,
    encoding: Encoding.UTF8
  })

  try {
    await FileOpener.open({
      filePath: result.uri, // Use the file's URI
      contentType: 'application/json',
      openWithDefault: true
    })
  } catch {
    $q.notify({
      message: 'Failed to open the exported profiles.',
      color: 'negative',
      position: 'top'
    })
  }
}

function downloadProfiles () {
  const jsonString = getProfilesInJson()
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url

  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function getProfilesInJson () {
  const setupStore = useSetupStore()
  const firearmStore = useFirearmStore()
  const opticStore = useOpticStore()
  const ammunitionStore = useAmmunitionStore()

  const { setupList } = storeToRefs(setupStore)
  const { firearmList } = storeToRefs(firearmStore)
  const { opticList } = storeToRefs(opticStore)
  const { ammunitionList } = storeToRefs(ammunitionStore)

  const data = {
    setupList: setupList.value,
    firearmList: firearmList.value,
    opticList: opticList.value,
    ammunitionList: ammunitionList.value
  }

  return JSON.stringify(data, null, 2)
}

</script>
