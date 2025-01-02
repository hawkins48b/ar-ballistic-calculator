<template>
  <q-form @submit="submit">
    <OpticTypeSelect
      v-model="optic.type"
      @change="opticChange"
    />
    <OpticNameInput
      v-model="optic.name"
      class="q-mt-md"
    />
    <OpticClickInput
      v-model:click="optic.clickValue"
      v-model:unit="optic.clickUnit"
      class="q-mt-md"
    />
    <OpticDotSizeInput
      v-if="optic.type === 'red dot'"
      v-model="optic.dotSize"
      class="q-mt-md"
    />
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
import { useOpticStore } from 'src/stores/profiles/optic'
import { computed, nextTick } from 'vue'
import OpticNameInput from './OpticNameInput.vue'
import OpticTypeSelect from './OpticTypeSelect.vue'
import OpticClickInput from './OpticClickInput.vue'
import OpticDotSizeInput from './OpticDotSizeInput.vue'

const emit = defineEmits(['submited'])

const optic = defineModel({
  type: Object
})

const opticStore = useOpticStore()

const context = computed(() => {
  let context = ''
  if (optic.value.id === undefined) {
    context = 'new'
  } else {
    context = 'edit'
  }
  return context
})

const submit = function () {
  if (context.value === 'new') {
    opticStore.addOptic(optic.value)
  }
  if (context.value === 'edit') {
    opticStore.editOptic(optic.value)
  }
  emit('submited')
}

const opticChange = function () {
  if (optic.value.type === 'red dot') {
    optic.value.clickUnit = 'MOA'
    nextTick(() => {
      optic.value.clickValue = 0.5
    })
  }
}
</script>
