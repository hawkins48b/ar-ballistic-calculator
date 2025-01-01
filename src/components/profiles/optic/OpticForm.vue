<template>
  <q-form @submit="submit">
    <OpticTypeSelect
      v-model="optic.type"
      class="q-mt-md"
    />
    <OpticNameInput
      v-model.name="optic.name"
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
import { computed } from 'vue'
import OpticNameInput from './OpticNameInput.vue'
import OpticTypeSelect from './OpticTypeSelect.vue'
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
</script>
