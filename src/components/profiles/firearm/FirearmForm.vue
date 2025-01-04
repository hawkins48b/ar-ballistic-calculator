<template>
  <q-form @submit="submit">
    <FirearmNameInput
      v-model="firearm.name"
    />
    <FirearmNotesInput
      v-model="firearm.notes"
      class="q-mt-md"
    />
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">
          Barrel
        </div>
        <FirearmBarrelLengthInput
          v-model:length="firearm.barrelLength"
          v-model:unit="firearm.barrelLengthUnit"
          class="q-mt-md"
        />
        <FirearmBarrelTwistInput
          v-model:twist="firearm.barrelTwist"
          v-model:unit="firearm.barrelTwistUnit"
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
import FirearmNameInput from './FirearmNameInput.vue'
import FirearmNotesInput from './FirearmNotesInput.vue'
import { computed } from 'vue'
import { useFirearmStore } from 'src/stores/profiles/firearm'
import FirearmBarrelLengthInput from './FirearmBarrelLengthInput.vue'
import FirearmBarrelTwistInput from './FirearmBarrelTwistInput.vue'

const emit = defineEmits(['submited'])

const firearm = defineModel({
  type: Object
})

const firearmStore = useFirearmStore()

const context = computed(() => {
  let context = ''
  if (firearm.value.id === undefined) {
    context = 'new'
  } else {
    context = 'edit'
  }
  return context
})

const submit = function () {
  if (context.value === 'new') {
    firearmStore.addFirearm(firearm.value)
  }
  if (context.value === 'edit') {
    firearmStore.editFirearm(firearm.value)
  }
  emit('submited')
}
</script>
