<template>
  <q-card
    class="q-mt-md"
  >
    <q-card-section>
      <div class="row">
        <div class="col text-h5">
          {{ ammunition.name }}
        </div>
        <div class="col-auto">
          <slot />
        </div>
      </div>
      <div class="text-caption">
        {{ ammunition.notes }}
      </div>
      <div class="row q-mt-sm">
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="360"
                size="md"
              />
            </div>
            <div class="col q-pl-sm">
              {{ ammunition.diameter }} {{ ammunition.diameterUnit }}
            </div>
          </div>
        </div>
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="height"
                size="md"
              />
            </div>
            <div class="col q-pl-sm">
              {{ ammunition.length }} {{ ammunition.lengthUnit }}
            </div>
          </div>
        </div>
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="scale"
                size="md"
              />
            </div>
            <div class="col q-pl-sm">
              {{ ammunition.weight }} {{ ammunition.weightUnit }}
            </div>
          </div>
        </div>
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="moving"
                size="md"
              />
            </div>
            <div class="col q-pl-sm">
              {{ ammunition.ballisticCoefficient }} {{ ammunition.ballisticCoefficientProfile }}
            </div>
          </div>
        </div>
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="local_fire_department"
                size="md"
              />
            </div>
            <div
              v-if="ammunition.usePowderSensitivity"
              class="col q-pl-sm"
            >
              {{ powderModifierLabel }}
            </div>
            <div
              v-if="!ammunition.usePowderSensitivity"
              class="col q-pl-sm"
            >
              Not sensitive
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'

const props = defineProps({
  ammunition: {
    type: Object,
    required: true
  }
})
const ammunitionStore = useAmmunitionStore()

const powderModifierLabel = computed(() => {
  let label = ''
  let modifier = 0

  if (props.ammunition.powderModifierUnit === 'FPS/°F') {
    modifier = ammunitionStore.convertMPSbyCtoFPSbyF(props.ammunition.powderModifier)
  }
  if (props.ammunition.powderModifierUnit === 'MPS/°C') {
    modifier = props.ammunition.powderModifier
  }

  label = `${modifier} ${props.ammunition.powderModifierUnit}`

  return label
})

</script>
