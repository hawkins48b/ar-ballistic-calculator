<template>
  <div>
    <q-file
      ref="fileRef"
      v-model="uploadedFile"
      style="display: none;"
      outlined
      dense
      accept=".json"
      @update:model-value="fileUploaded"
    />
    <q-btn
      icon="attach_file"
      outline
      style="width:180px"
      @click="pickFile()"
    >
      Upload file
    </q-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useSetupStore } from 'stores/profiles/setup'
import { useAmmunitionStore } from 'stores/profiles/ammunition'
import { useFirearmStore } from 'stores/profiles/firearm'
import { useOpticStore } from 'stores/profiles/optic'

const $q = useQuasar()
const uploadedFile = ref(null) // Holds the selected file

const fileRef = ref(null)
function pickFile () {
  fileRef.value.pickFiles()
}

function fileUploaded () {
  if (uploadedFile.value) {
    const fileReader = new FileReader()
    fileReader.onload = function (event) {
      const jsonData = JSON.parse(fileReader.result)

      try {
        processData(jsonData)

        $q.notify({
          message: 'Profiles imported succesfully.',
          color: 'positive',
          position: 'top'
        })
      } catch {
        $q.notify({
          message: 'Failed to import profiles.',
          color: 'negative',
          position: 'top'
        })
      }

      // clear the upload field
      uploadedFile.value = null
    }

    fileReader.readAsText(uploadedFile.value)
  }
}

function processData (jsonData) {
  // stores
  const setupStore = useSetupStore()
  const firearmStore = useFirearmStore()
  const opticStore = useOpticStore()
  const ammunitionStore = useAmmunitionStore()
  // array for old and new IDs
  const compareFirearmIds = []
  const compareOpticIds = []
  const compareAmmunitionIds = []

  // process firearms
  if (jsonData.firearmList) {
    jsonData.firearmList.forEach(firearm => {
      const oldId = firearm.id
      const newId = firearmStore.addFirearm(firearm)
      compareFirearmIds.push({
        oldId,
        newId
      })
    })
  }

  // process optics
  if (jsonData.opticList) {
    jsonData.opticList.forEach(optic => {
      const oldId = optic.id
      const newId = opticStore.addOptic(optic)
      compareOpticIds.push({
        oldId,
        newId
      })
    })
  }

  // process ammunitions
  if (jsonData.ammunitionList) {
    jsonData.ammunitionList.forEach(ammunition => {
      const oldId = ammunition.id
      const newId = ammunitionStore.addAmmunition(ammunition)
      compareAmmunitionIds.push({
        oldId,
        newId
      })
    })
  }

  // process setups
  if (jsonData.setupList) {
    jsonData.setupList.forEach(setup => {
      if (setup.firearmId) {
        const firearmIds = compareFirearmIds.find(element => element.oldId === setup.firearmId)

        if (firearmIds) {
          setup.firearmId = firearmIds.newId
        }
      }
      if (setup.opticId) {
        const opticIds = compareOpticIds.find(element => element.oldId === setup.opticId)
        if (opticIds) {
          setup.opticId = opticIds.newId
        }
      }
      if (setup.ammunitionId) {
        const ammunitionIds = compareAmmunitionIds.find(element => element.oldId === setup.ammunitionId)
        if (ammunitionIds) {
          setup.ammunitionId = ammunitionIds.newId
        }
      }
      setupStore.addSetup(setup)
    })
  }
}
</script>
