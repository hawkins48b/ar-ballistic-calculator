<template>
  <q-form @submit="submit">
    <SetupNameInput v-model="setup.name" />
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">
          Components
        </div>
        <SetupFirearm
          v-model="setup.firearmId"
          class="q-mt-md"
        />
        <SetupOptic
          v-model="setup.opticId"
          class="q-mt-md"
        />
        <SetupAmmunition
          v-model="setup.ammunitionId"
          class="q-mt-md"
        />
      </q-card-section>
    </q-card>
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">
          Measurements
        </div>
        <SetupOpticHeightInput
          v-model:height="setup.measureOpticHeight"
          v-model:unit="setup.measureOpticHeightUnit"
          class="q-mt-md"
        />
        <SetupVelocityInput
          v-model:velocity="setup.measureVelocity"
          v-model:velocity-unit="setup.measureVelocityUnit"
          v-model:temperature="setup.measureVelocityTemperature"
          v-model:temperature-unit="setup.measureVelocityTemperatureUnit"
          class="q-mt-md"
        />
      </q-card-section>
    </q-card>
    <div class="q-mt-md">
      <q-btn
        v-if="context === 'new'"
        type="submit"
        icon="add"
        color="primary"
        class="full-width"
      >
        Add
      </q-btn>
      <q-btn
        v-if="context === 'edit'"
        type="submit"
        icon="edit"
        class="full-width"
        color="primary"
      >
        Edit
      </q-btn>
    </div>
  </q-form>
</template>

<script setup>
import { useSetupStore } from 'src/stores/profiles/setup'
import { computed } from 'vue'
import SetupNameInput from './SetupNameInput.vue'
import SetupFirearm from './SetupFirearm.vue'
import SetupOptic from './SetupOptic.vue'
import SetupAmmunition from './SetupAmmunition.vue'
import SetupOpticHeightInput from './SetupOpticHeightInput.vue'
import SetupVelocityInput from './SetupVelocityInput.vue'

const setup = defineModel({
  type: Object
})

const setupStore = useSetupStore()

const emit = defineEmits(['submited'])

const context = computed(() => {
  let context = ''
  if (setup.value.id === undefined) {
    context = 'new'
  } else {
    context = 'edit'
  }
  return context
})

const submit = function () {
  if (context.value === 'new') {
    setupStore.addSetup(setup.value)
  }
  if (context.value === 'edit') {
    setupStore.editSetup(setup.value)
  }
  emit('submited')
}

</script>
