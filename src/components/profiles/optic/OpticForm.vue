<template>
  <q-form @submit="submit">
    <RadioCard
      v-model="optic.type"
      :options="[
        {
          icon: 'adjust',
          label: 'Red dot',
          value: 'red dot'
        },
        {
          icon: 'center_focus_weak',
          label: 'Prism',
          value: 'prism'
        },
        {
          icon: 'fiber_smart_record',
          label: 'Scope',
          value: 'scope'
        }
      ]"
      @change="opticChange"
    />
    <OpticNameInput
      v-model="optic.name"
      class="q-mt-md"
    />
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">
          Reticle
        </div>
        <RadioCard
          v-if="optic.type === 'prism' || optic.type === 'scope'"
          v-model="optic.reticle"
          :options="[
            {
              label: 'MOA',
              value: 'MOA'
            },
            {
              label: 'MRAD',
              value: 'MRAD'
            }
          ]"
          class="q-mt-md"
        />
        <RadioCard
          v-if="optic.type === 'scope'"
          v-model="optic.focalPlane"
          :options="[
            {
              label: '1st focal plane',
              value: 'first'
            },
            {
              label: '2nd focal plane',
              value: 'second'
            }
          ]"
          class="q-mt-md"
        />
        <OpticDotSizeInput
          v-if="optic.type === 'red dot'"
          v-model="optic.dotSize"
          class="q-mt-md"
        />
      </q-card-section>
    </q-card>
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">
          Adjustments
        </div>
        <OpticClickInput
          v-model:elevation-click="optic.elevationClickValue"
          v-model:elevation-unit="optic.elevationClickUnit"
          v-model:windage-click="optic.windageClickValue"
          v-model:windage-unit="optic.windageClickUnit"
          class="q-mt-md"
        />
      </q-card-section>
    </q-card>
    <q-card
      v-if="optic.type === 'prism' || optic.type === 'scope'"
      class="q-mt-md"
    >
      <q-card-section>
        <div class="text-h6">
          Magnification
        </div>
        <OpticZoomInput
          v-model="optic.zoom"
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
import { useOpticStore } from 'src/stores/profiles/optic'
import { computed, nextTick } from 'vue'
import OpticNameInput from './OpticNameInput.vue'
import OpticClickInput from './OpticClickInput.vue'
import OpticDotSizeInput from './OpticDotSizeInput.vue'
import OpticZoomInput from './OpticZoomInput.vue'
import RadioCard from 'src/components/RadioCard.vue'

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
    optic.value.zoom = 1
    nextTick(() => { // prevent unit conversion
      optic.value.clickValue = 0.5
    })
  }
  if (optic.value.type === 'prism') {
    optic.value.focalPlane = 'second'
  }
}
</script>
